import * as d3 from "d3";
import * as G from "./global";
import { RegionCollection, RegionFeature } from "./geoTypes";
import type { Feature, FeatureCollection, GeometryObject, MultiPolygon } from "geojson";

// Tipagem para as linhas do CSV de dados regionais
interface RegionalDataRow {
  UF: string;
  codigo_municipio: string;
  baixo_peso: string;
  eutrofico: string;
  sobrepeso: string;
  obesidade_G_1: string;
  obesidade_G_2: string;
  obesidade_G_3: string;
  magreza_acentuada: string;
  magreza: string;
  obesidade: string;
  obesidade_grave: string;
  SEXO: string;
  fase_vida: string;

  [key: string]: string;
}


// Tipagem para info de regiões de saúde
interface RegionInfo {
  municipio_id_sdv: string;
  regional_id: string;
  regional_nome: string;
  uf: string;
}

/**
 * Inicializa a visualização regional (Brasil > Estados > Municípios ou Regiões de Saúde)
 */
export function initRegional(
  mapContainer: HTMLElement,
  selectAno: HTMLSelectElement,           // ← ano
  selectSexo: HTMLSelectElement,          // ← sexo
  selectFase: HTMLSelectElement,          // ← fase de vida
  selectNutricional: HTMLSelectElement,   // ← indicador
  selectModo: HTMLSelectElement,          // ← divisão
  containerDivisao: d3.Selection<HTMLElement, unknown, null, undefined>,
  titleEl: HTMLElement,
  valorMulheresEl: HTMLElement,
  valorHomensEl: HTMLElement,
  valorTodosEl: HTMLElement
) {
  // Estado interno
  let currentMode: "brasil" | "estados" | "cidades" | "healthRegion" = "brasil";
  let currentUF: string | null = null;
  let lastGeoBrasilData: any, lastGeoEstadosData: any;
  const regionInfo: RegionInfo[] = [];
  const regionMap = new Map<string,string>();
  let allData: RegionalDataRow[] = [];
  const tooltip = d3.select<HTMLDivElement, unknown>(".tooltip-regional");

   // Quadro de Entrevistados (atualiza os counters de Mulheres, Homens e Total)
  function atualizarQuadroRegional(): void {
    const anoSel         = +selectAno.value;
    const sexoSel        = selectSexo.value;
    const faseSel        = selectFase.value;
    const nutricionalSel = selectNutricional.value;

    // Filtra a base por ano, fase e (se estadual) UF
    let arr = allData.filter(d =>
      +d.ANO === anoSel &&
      d.fase_vida === faseSel &&
      (currentMode !== "cidades" || d.UF === currentUF)
    );
    if (sexoSel !== "Todos") {
      arr = arr.filter(d => d.SEXO === sexoSel);
    }
    if (nutricionalSel !== "Total") {
      arr = arr.filter(d => +d[nutricionalSel] > 0);
    }

    // Soma por sexo
    let totalFem = 0, totalMasc = 0;
    if (nutricionalSel === "Total") {
      totalFem  = d3.sum(arr.filter(d => d.SEXO === "Fem"),  d => +d.total);
      totalMasc = d3.sum(arr.filter(d => d.SEXO === "Masc"), d => +d.total);
    } else {
      totalFem  = d3.sum(arr.filter(d => d.SEXO === "Fem"),  d => +d[nutricionalSel]);
      totalMasc = d3.sum(arr.filter(d => d.SEXO === "Masc"), d => +d[nutricionalSel]);
    }
    const totalAll = totalFem + totalMasc;

    valorMulheresEl.textContent = totalFem.toLocaleString("pt-BR");
    valorHomensEl.textContent   = totalMasc.toLocaleString("pt-BR");
    valorTodosEl.textContent    = totalAll.toLocaleString("pt-BR");
  }

  // Atualiza o título da visualização regional
  function atualizarTituloRegional(): void {
    const ano          = selectAno.value;
    const sexo         = selectSexo.value;
    const nutricional  = selectNutricional.value;
    const fase         = selectFase.value;
    const lugar        = (currentMode === "cidades" && currentUF)
      ? (G.ufLabel[currentUF] || currentUF)
      : "";
    const displayNutri = G.nomeAmigavel[nutricional] || nutricional;
    const labelFase    = G.faseLabel[fase] || fase;
    const labelSexo    = sexo === "Todos" ? "" : G.sexoLabel[sexo] || sexo;

    const titulo = `Mapeamento Regional de ${displayNutri} em ${labelFase} ${labelSexo} - ${lugar} ${ano}`;
    titleEl.textContent = titulo;
  }  

  // formata valores absolutos e percentuais
  const formatNumber = d3.formatLocale({
   decimal:  ",",
   thousands: ".",
   grouping:  [3],            // agrupa dígitos em milhares
   currency:  ["R$",""]       // símbolo antes e depois (no caso só antes)
   }).format(",");
  const formatPercent = d3.format(".1f");

  // 1) Carrega CSV de dados e de regions
  Promise.all([
    d3.csv<RegionalDataRow>(G.csvDataUrl, row => ({
      UF:               row.UF,
      codigo_municipio: row.codigo_municipio,
      SEXO:             row.SEXO,
      ANO:              row.ANO,
      fase_vida:        row.fase_vida,
      baixo_peso:       row.baixo_peso,
      eutrofico:        row.eutrofico,
      sobrepeso:        row.sobrepeso,
      obesidade_G_1:    row.obesidade_G_1,
      obesidade_G_2:    row.obesidade_G_2,
      obesidade_G_3:    row.obesidade_G_3,
      magreza_acentuada:row.magreza_acentuada,
      magreza:          row.magreza,
      obesidade:        row.obesidade,
      obesidade_grave:  row.obesidade_grave
      // caso existam outras colunas no CSV que você use, adicione-as aqui
      })),
    d3.csv<RegionInfo>(G.csvRegionUrl, row => ({
      municipio_id_sdv: row.municipio_id_sdv,
      regional_id:      row.regional_id,
      regional_nome:    row.regional_nome || row.nome,
      uf:               row.estado_abrev
    }))
  ]).then(([dataRows, regions]) => {
    allData = dataRows;
    regionInfo.push(...regions);
    // preenche map de lookup
    regions.forEach(r => regionMap.set(r.municipio_id_sdv, r.regional_id));

    // popula selects
    populateFilters();
    // renderiza mapa inicial (país)
    initBrasilMap();
    // listeners
    setupListeners();
  });

  // Popula selects de fase e nutricional
  function populateFilters() {

    // Ano
    selectAno.innerHTML = "";
    Array.from(new Set(allData.map(d => +d.ANO)))
         .sort((a,b)=>(a-b)).reverse()
         .forEach(ano => {
            const o = document.createElement("option");
            o.value = String(ano);
            o.text  = String(ano);
            selectAno.appendChild(o);
         });

    // Sexo
    selectSexo.innerHTML = "";
    Object.entries(G.sexoLabel).sort().reverse().forEach(([key,label]) => {
      const o = document.createElement("option");
      o.value = key; o.text = label;
      selectSexo.appendChild(o);
    });
    // Fase
    selectFase.innerHTML = "";
    Object.entries(G.faseLabel).forEach(([key,label]) => {
      const o = document.createElement("option");
      o.value = key; o.text = label;
      selectFase.appendChild(o);
    });

    populateNutricional();
    selectFase.addEventListener("change",populateNutricional)

    function populateNutricional(){
      const fase = selectFase.value;
      const opts = G.filtroNutricionalFase[fase] || [];
      selectNutricional.innerHTML="";
      opts.forEach((value)=>{
         const o = document.createElement("option");
         o.value = value;
         o.text = G.estadoLabel[value] || value;
         selectNutricional.appendChild(o);

      });
    }

    // Modo
    selectModo.innerHTML = "";
    [["federativa","Divisão Federativa"],["saude","Regiões de Saúde"]]
      .forEach(([v,l]) => {
        const o = document.createElement("option"); o.value = String(v); o.text = String(l);
        selectModo.appendChild(o);
   });
  }

  // Cria listeners em selects
  function setupListeners() {
   selectAno.onchange = () =>          reloadMap();
   selectSexo.onchange = () =>         reloadMap();
   selectFase.onchange = () =>         reloadMap();
   selectNutricional.onchange = () =>  reloadMap();
   selectModo.onchange = () =>         reloadMap();
  }

  function AtualizarMapa(LastGeoData){
   [selectAno,selectSexo,selectFase,selectNutricional].forEach(selecao =>
      selecao.onchange = () => {
         reloadUpdate(LastGeoData);
         atualizarQuadroRegional();
         atualizarTituloRegional();
      }
  )}

  function LimpaMapa(){
   tooltip.classed("opacity-0", true).classed("hidden",true);   
   d3.select(mapContainer).selectAll("*").remove();
   d3.select(".legendRegional").selectAll("*").remove();
  }

  function reloadUpdate(geodata){
   if (currentMode === "brasil"){
      updateBrasilMap(geodata);
   } else if (currentMode === "estados"){
      updateEstadosMap(geodata);
   } else if (currentMode === "cidades"){
      updateCidadesMap(geodata);
   } else 
      updateHealthRegionMap(geodata);
  } 

  // Re-renderiza mapa e quadro
  function reloadMap(): void {
   switch (currentMode) {
      case "brasil":
         initBrasilMap();
         break;

      case "estados":
         initEstadosMap();
         break;

      case "cidades":
         initCidadesMap(currentUF!);
         break;

      case "healthRegion":
         initHealthRegionMap(currentUF!);
         break;

      default:
         // fallback seguro
         initBrasilMap();
   }
   }

  // === País ===
  // País (todo o Brasil)
   function initBrasilMap(): void {
   // limpa paths e alertas antigos
   d3.select(mapContainer).selectAll("path.state, path.municipio").remove();
   d3.select(mapContainer).selectAll("h2, .alerta-mapa").remove();
   containerDivisao.classed("hidden", true);
   LimpaMapa();

   currentMode = "brasil";
   currentUF  = null;

   // carrega o geojson do Brasil
   d3.json<any>("data/geojson/brazil.json").then(geoData => {
      lastGeoBrasilData = geoData;

      // atualiza quadro de números (mulheres, homens, total) e título
      atualizarQuadroRegional();
      atualizarTituloRegional();
      AtualizarMapa(lastGeoBrasilData);
      

      // cria <svg> se não existir
      let svg = d3.select(mapContainer).select<SVGSVGElement>("svg");
      if (svg.empty()) {
         svg = d3.select(mapContainer)
         .append("svg")
         .attr("width", G.width)
         .attr("height", G.height);
      }

      // desenha o mapa
      updateBrasilMap(geoData);

      // alerta instruindo o usuário
      d3.select(mapContainer)
         .append("div")
         .attr("class", "alerta-mapa alerta-mapa-base")
         .text("⚠️Clique com o botão esquerdo do mouse no mapa para visualizar os estados");
   });
   }

   // Re-renderiza o mapa do Brasil com o geoData carregado
   function updateBrasilMap(geoData: any): void {
      // 1) Lê filtros
      const filtroAno   = +selectAno.value;
      const filtroSexo  = selectSexo.value;
      const filtroFase  = selectFase.value;
      const filtroNutr  = selectNutricional.value;

      // 2) Filtra base e total geral
      const arrAll = allData.filter(d =>
         +d.ANO      === filtroAno &&
         d.fase_vida === filtroFase &&
         (filtroSexo === "Todos" || d.SEXO === filtroSexo)
      );
      const totalAll = d3.sum(arrAll, d => +d.total);

      // 3) Nomes e percentuais
      const nomesIndicadores = filtroFase === "adulto"
         ? G.nomesIndicadoresAdulto
         : G.nomesIndicadoresAdolescente;
      const nutricionalName = nomesIndicadores[filtroNutr] || filtroNutr;

      const nutrCount = d3.sum(arrAll, d => +d[filtroNutr]);

      const nutrPct = totalAll ? (nutrCount / totalAll) * 100 : 0;

      let pctFem = 0, pctMasc = 0;
      if (filtroSexo === "Todos") {
         const totalFem  = d3.sum(arrAll.filter(d => d.SEXO === "Fem"),  d => +d.total);
         const totalMasc = d3.sum(arrAll.filter(d => d.SEXO === "Masc"), d => +d.total);
         pctFem  = totalAll ? (totalFem  / totalAll) * 100 : 0;
         pctMasc = totalAll ? (totalMasc / totalAll) * 100 : 0;
      }

      // 4) Escala de cor
      const indicadores = Object.keys(nomesIndicadores);
      const pctValues = indicadores.map(ind => {
         const count = ind === "Total"
            ? totalAll
            : d3.sum(arrAll, d => +d[ind]);
         return totalAll ? (count / totalAll) * 100 : 0;
      });
      const minVal = d3.min(pctValues) ?? 0;
      const maxVal = d3.max(pctValues) ?? 0;
      const colorScaleCountry = G.getColorScale(filtroSexo, minVal, maxVal);

      // 5) Projeção e gerador de path
      const projection = d3.geoMercator().fitSize([G.width, G.height], geoData);
      const pathGen    = d3.geoPath().projection(projection);

      // 6) Tooltip local para Brasil
      const showTooltipBrasil = (event: MouseEvent, d: any) => {
         const lines = [
            `<div class="tooltip-title">Brasil</div>`,
            `<div><span class="tooltip-subtitle">${nutricionalName}:</span> ${nutrPct.toFixed(1)}%</div>`,
            ...(filtroSexo === "Todos" ? [
            `<div class="tooltip-fem">Fem: ${pctFem.toFixed(1)}%</div>`,
            `<div class="tooltip-masc">Masc: ${pctMasc.toFixed(1)}%</div>`
            ] : [])
         ];
         G.showTooltip(`<div class="tooltip-content">${lines.join("")}</div>`, event);
      };

      // 7) Desenha contorno país
      const svg = d3.select(mapContainer).select("svg");
      svg.selectAll("path.country-boundary")
      .data([geoData as any])         // note o array: um único elemento  
      .join("path")
         .attr("class", "country-boundary")
         .attr("d", (d: any) => pathGen(d)!)  // pathGen sabe lidar com FeatureCollection
         .attr("fill", colorScaleCountry(nutrPct))  // pinta todo o país pela % nacional
         .attr("stroke", G.getStrokeColor[filtroSexo])    // ou remova o stroke interno: .attr("stroke", "none")
         .attr("stroke-width", 1)
         .on("mouseover", (event, d) => {
            // mesmo tooltip que você já tinha para "estados"
            showTooltipBrasil(event, d);
            d3.select(event.currentTarget as Element).attr("stroke-width", 2);
         })
         .on("mousemove", G.moveTooltip)
         .on("mouseout", () => {
            G.hideTooltip();
            d3.select(event.currentTarget as Element).attr("stroke-width", 1);
         })
         .on("click", () => {
            initEstadosMap();            
         })
         .on("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            initBrasilMap();
         });

   }

     
  // === Estados ===
   function initEstadosMap(): void {
      // oculta subviews
      d3.select(mapContainer).selectAll(".hidden");
      containerDivisao.classed("hidden", true);
      LimpaMapa();

      currentMode = "estados";

      // carrega geojson de estados
      d3.json<any>("data/geojson/br_states.json").then(geoData => {
         lastGeoEstadosData = geoData;

         AtualizarMapa(lastGeoEstadosData);

         // cria svg se não existir
         let svg = d3.select(mapContainer).select<SVGSVGElement>("svg");
         if (svg.empty()) {
         svg = d3.select(mapContainer)
            .append("svg")
            .attr("width", G.width)
            .attr("height", G.height);
         }

         // primeiro quadro e mapa
         atualizarQuadroRegional();
         updateEstadosMap(geoData);
         atualizarTituloRegional();
      });
   }

   function updateEstadosMap(geoData: FeatureCollection<GeometryObject, any>): void {
      const features = geoData.features as Feature<GeometryObject, any>[];
      // lê valores dos selects
      const filtroAno = selectAno.value;
      const filtroSexo = selectSexo.value;
      const filtroNutricional = selectNutricional.value;
      const filtroFase = selectFase.value;

      // filtra dados por ano e fase
      const allStateData = allData.filter(d =>
         +d.ANO === +filtroAno && d.fase_vida === filtroFase
      );

      const valoresMapa = new Map<string, number>();
      const stateAggregates = new Map<string, { total: number; fem?: number; masc?: number; nutrient?: number }>();

      // agregação por UF
      if (filtroNutricional === "Total") {
         if (filtroSexo === "Todos") {
         allStateData.forEach(d => {
            const uf = d.UF;
            const sumVal = (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3);
            valoresMapa.set(uf, (valoresMapa.get(uf) || 0) + sumVal);
            if (!stateAggregates.has(uf)) stateAggregates.set(uf, { total: 0, fem: 0, masc: 0 });
            const agg = stateAggregates.get(uf)!;
            agg.total += sumVal;
            if (d.SEXO === "Fem") agg.fem! += sumVal;
            else if (d.SEXO === "Masc") agg.masc! += sumVal;
         });
         } else {
         allStateData.filter(d => d.SEXO === filtroSexo).forEach(d => {
            const uf = d.UF;
            const sumVal = (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3);
            valoresMapa.set(uf, (valoresMapa.get(uf) || 0) + sumVal);
            if (!stateAggregates.has(uf)) stateAggregates.set(uf, { total: 0 });
            stateAggregates.get(uf)!.total += sumVal;
         });
         }
      } else {
         // lógica de porcentagem conforme sexo e indicador
         if (filtroSexo === "Todos") {
         const roll = d3.rollup(
            allStateData,
            v => {
               const totalSum = d3.sum(v, d => (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3));
               const nutrientSum = d3.sum(v, d => +d[filtroNutricional]);
               return totalSum > 0 ? (nutrientSum/totalSum)*100 : 0;
            },
            d => d.UF
         );
         roll.forEach((val, uf) => valoresMapa.set(uf, val));
         allStateData.forEach(d => {
            const uf = d.UF;
            const nutrient = +d[filtroNutricional];
            if (!stateAggregates.has(uf)) stateAggregates.set(uf, { total: 0, fem: 0, masc: 0 });
            const agg = stateAggregates.get(uf)!;
            agg.total += (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3);
            if (d.SEXO === "Fem") agg.fem! += nutrient;
            else if (d.SEXO === "Masc") agg.masc! += nutrient;
         });
         } else {
         const rollSex = d3.rollup(
            allStateData.filter(d => d.SEXO === filtroSexo),
            v => {
               const totalSum = d3.sum(v, d => (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3));
               const nutrientSum = d3.sum(v, d => +d[filtroNutricional]);
               return totalSum > 0 ? (nutrientSum/totalSum)*100 : 0;
            },
            d => d.UF
         );
         rollSex.forEach((val, uf) => valoresMapa.set(uf, val));
         // builder para tooltip estadual
         const tooltipRoll = d3.rollup(
            allStateData.filter(d => d.SEXO === filtroSexo),
            v => ({
               total: d3.sum(v, d => (+d.baixo_peso) + (+d.eutrofico) + (+d.sobrepeso)
               + (+d.obesidade_G_1) + (+d.obesidade_G_2) + (+d.obesidade_G_3)),
               nutrient: d3.sum(v, d => +d[filtroNutricional])
            }),
            d => d.UF
         );
         tooltipRoll.forEach((val, uf) => stateAggregates.set(uf, val));
         }
      }

      // escalas de cor
      const vals = Array.from(valoresMapa.values());
      const minVal = d3.min(vals) ?? 0;
      const maxVal = d3.max(vals) ?? 0;
      const colorScale = G.getColorScale(filtroSexo, minVal, maxVal);

      // injeta properties no geoData
      geoData.features.forEach((f: any) => {
         f.properties.value = valoresMapa.get(f.id) || 0;
      });

      // projeção personalizada para o estado
      const projection = d3.geoMercator()
         .fitSize([G.width, G.height], geoData);
      const pathGen = d3.geoPath().projection(projection);

      // cria/limpa svg
      let svgBrasil = d3.select(mapContainer).select<SVGSVGElement>("svg");
      if (svgBrasil.empty()) {
         svgBrasil = d3.select(mapContainer)
         .append("svg")
         .attr("width", G.width)
         .attr("height", G.height);
      }

      svgBrasil
         .selectAll<SVGPathElement, Feature<GeometryObject, any>>("path.map-path.state")
         .data(features)
         .join("path")
            .classed("map-path state", true)
            .attr("stroke", G.getStrokeColor[filtroSexo])
            .attr("d", d => pathGen(d)!)
            .attr("fill", d => {
            const val = valoresMapa.get(d.id as string);
            return val !== undefined ? colorScale(val) : "#ccc";
            })
         .on("mouseover", function(event, d) {
            const id = d.id as string;
            const nome = G.ufLabel[id] || id;
            const agg = stateAggregates.get(id) || { total: 0, fem: 0, masc: 0};
            let content: string[] = [];
            if (filtroSexo === "Todos") {
               const total = agg.total!;
               const nutrientSum = agg.fem! + agg.masc!;
               const statePerc = total > 0 ? (nutrientSum/total)*100 : 0;
               const percFem = nutrientSum > 0 ? (agg.fem!/nutrientSum)*100 : 0;
               const percMasc = nutrientSum > 0 ? (agg.masc!/nutrientSum)*100 : 0;
               content = [
                  `<div class="tooltip-title">${nome}:<span class="notbold"> ${statePerc.toFixed(1)}%</span></div>`,
                  `<div class="tooltip-fem">Feminino:<span class="notbold"> ${percFem.toFixed(1)}%</span></div>`,
                  `<div class="tooltip-masc">Masculino:<span class="notbold"> ${percMasc.toFixed(1)}%</span></div>`
               ];
            } else {
               const total = agg.total!;
               const val = (agg.nutrient as number) || 0;
               const perc = total > 0 ? (val/total)*100 : 0;
               content = [
                  `<div class="tooltip-title">${nome}: <span class="notbold">${perc.toFixed(1)}%</span></div>`
               ];
            }
            G.showTooltip(`<div class="tooltip-content">${content.join(``)}</div>`, event);
         
            d3.select(event.currentTarget as Element).attr("stroke-width", 2);
         })
         .on("mousemove", G.moveTooltip)
         .on("mouseout", (event) => {
         G.hideTooltip();
         d3.select(event.currentTarget as Element).attr("stroke-width", 1);
         })
         .on("click", (event, d: any) => {
            const id = d.id as string;
            if (selectModo.value === "federativa"){
               initCidadesMap(id);
            } else { 
               initHealthRegionMap(id);
            }
         })
         .on("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            initBrasilMap();
         });

      // Legenda lateral
      G.legendasMapa(mapContainer,colorScale,minVal,maxVal);

      // container para alertas
      const container = d3.select(mapContainer);
      if(container.selectAll(".alerta-mapa").empty()){
         container.append("div")
            .attr("class", "alerta-mapa alerta-mapa-base")
            .text("⚠️Clique com o botão esquerdo do mouse no estado para visualizá-lo");
         container.append("div")
            .attr("class", "alerta-mapa alerta-extra alerta-mapa-base")
            .text("Clique com o botão direito do mouse para voltar à visualização Nacional");
      }
      
   }

  // === Municípios ou Regiões de Saúde ===
  // =======================
   // VISÃO MUNICIPAL (Divisão Federativa) OU Regiões de Saúde
   // =======================
   function initCidadesMap(uf: string): void {
   currentMode = "cidades";
   currentUF = uf;
   LimpaMapa();

   // mostra o container de divisões
   containerDivisao.classed("hidden", false);
   selectModo.value = "federativa";

   // ao mudar o modo (federativa ↔ saude)
   selectModo.onchange = () => {
      if (selectModo.value === "saude") {
         initHealthRegionMap(currentUF);
      } else {
         initCidadesMap(currentUF);
      }
   };

   // limpa mapa e legenda
   d3.select(mapContainer).html("");
   d3.select(mapContainer.parentElement!)
      .select(".legendRegional")
      .html("");

   // título do estado
   d3.select(mapContainer)
      .insert("h2", ":first-child")
      .text(G.ufLabel[uf] || uf)
      .classed("text-center font-bold", true);

   AtualizarMapa(uf);

   // monta o mapa municipal/regional
   updateCidadesMap(uf);
   atualizarTituloRegional();
   }

   function updateCidadesMap(uf: string): void {
   
   // lê filtros
   const selectedYear     = selectAno.value;
   const selectedSexo     = selectSexo.value;
   const selectedNutricao = selectNutricional.value;
   const filtroFase       = selectFase.value;

   // carrega o GeoJSON correto
   const geojsonFile = G.stateGeojsonFiles[uf];
   d3.json<any>(geojsonFile).then(geo => {
      // filtra a base
      let stateCSV = allData.filter(d => d.UF === uf && d.fase_vida === filtroFase && d.ANO === selectedYear);
      
      if (selectedSexo !== "Todos") {
         stateCSV = stateCSV.filter(d => d.SEXO === selectedSexo);
      }

      // agrega: total ou %, por município
      let agg: Map<string, number>;
      if (selectedNutricao === "Total") {
         agg = d3.rollup(
         stateCSV,
         v => d3.sum(v, d =>
            +d.baixo_peso + +d.eutrofico + +d.sobrepeso +
            +d.obesidade_G_1 + +d.obesidade_G_2 + +d.obesidade_G_3
         ),
         d => d.codigo_municipio
         );
      } else {
         agg = d3.rollup(
         stateCSV,
         v => {
            const sumCat   = d3.sum(v, d => +d[selectedNutricao]);
            const totalSum = d3.sum(v, d =>
               +d.baixo_peso + +d.eutrofico + +d.sobrepeso +
               +d.obesidade_G_1 + +d.obesidade_G_2 + +d.obesidade_G_3
            );
            return totalSum > 0 ? (sumCat / totalSum) * 100 : 0;
         },
         d => d.codigo_municipio
         );
      }

      // atualiza quadro de totais
      atualizarQuadroRegional();

      // determina escala de cor
      const vals = Array.from(agg.values());
      const minVal = d3.min(vals) ?? 0;
      const maxVal = d3.max(vals) ?? 0;
      const colorScale = G.getColorScale(selectedSexo, minVal, maxVal);
      
      // injeta o valor no geo
      geo.features.forEach((f: any) => {
         const code = f.properties.id || f.properties.CODMUN || f.properties.cod_mun;
         f.properties.value = agg.get(code) || 0;
      });

      // cria ou seleciona svg
      let svgEstado = d3.select(mapContainer).select<SVGSVGElement>("svg");
      if (svgEstado.empty()) {
         svgEstado = d3.select(mapContainer)
         .append("svg")
         .attr("width", G.width)
         .attr("height", G.height);
      }

      // projeção e path
      const projection = d3.geoMercator().fitSize([G.width, G.height], geo);
      const pathGen    = d3.geoPath().projection(projection);

      // desenha municípios/regiões
      svgEstado.selectAll<SVGPathElement, any>("path.map-path.municipio")
         .data(geo.features as any[])
         .join("path")
         .classed("map-path municipio", true)
         .attr("stroke", G.getStrokeColor[selectedSexo])
         .attr("d", pathGen as any)
         .attr("fill", d => {
            const code = d.properties.id || d.properties.CODMUN || d.properties.cod_mun;
            const v = agg.get(code) ?? 0;
            return v === 0 ? "#ccc" : colorScale(v);
         })
         
        .on("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            initEstadosMap();
         })
         .on("mouseover", function(event, d:any) {
            // Pré-agrega dados para os tooltips dos municípios
            const stateAllData = stateCSV.filter(d => d.ANO === selectedYear && d.UF === uf);
            let tooltipLookup, totalSexState;
            if (selectedNutricao === "Total") {
               if (selectedSexo === "Todos") {
                  tooltipLookup = d3.rollup(stateAllData, v => {
                     return {
                        total: d3.sum(v, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)),
                        fem: d3.sum(v.filter(d => d.SEXO === "Fem"), d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)),
                        masc: d3.sum(v.filter(d => d.SEXO === "Masc"), d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3))
                     };
                  }, d => d.codigo_municipio);
               } else {
                  const filteredData = stateAllData.filter(d => d.SEXO === selectedSexo);
                  tooltipLookup = d3.rollup(filteredData, v => d3.sum(v, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)), d => d.codigo_municipio);
                  totalSexState = d3.sum(filteredData, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3));
               }
            } else {
               if (selectedSexo === "Todos") {
                  tooltipLookup = d3.rollup(stateAllData, v => {
                     return {
                        nutrient: d3.sum(v, d => +d[selectedNutricao]),
                        total: d3.sum(v, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)),
                        fem: d3.sum(v.filter(d => d.SEXO === "Fem"), d => +d[selectedNutricao]),
                        masc: d3.sum(v.filter(d => d.SEXO === "Masc"), d => +d[selectedNutricao])
                     };
                  }, d => d.codigo_municipio);
               } else {
                  const filteredData = stateAllData.filter(d => d.SEXO === selectedSexo);
                  tooltipLookup = d3.rollup(filteredData, v => {
                     return {
                        nutrient: d3.sum(v, d => +d[selectedNutricao]),
                        total: d3.sum(v, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3))
                     };
                  }, d => d.codigo_municipio);
               }
            }
           let htmlContent = [];
           const muniCode = d.properties.id || d.properties.CODMUN || d.properties.cod_mun;
           if (selectedSexo === "Todos") {
               const agg = tooltipLookup.get(muniCode) || {nutrient:0, total:0, fem:0, masc:0};
               const total = agg.total;
               const nutrientSum = agg.nutrient;
               const statePerc = total > 0 ? (nutrientSum/total)*100 : 0;
               const percFem = (agg.fem + agg.masc) > 0 ? (agg.fem/(agg.fem+agg.masc))*100 : 0;
               const percMasc = (agg.fem + agg.masc) > 0 ? (agg.masc/(agg.fem+agg.masc))*100 : 0;
               htmlContent = [`<div class="tooltip-title">${d.properties.name}: <span style="font-size:15px;"><span class="notbold">${statePerc.toFixed(1)}%</span></div>`,
                  `<div class="tooltip-fem">Feminino: <span class="notbold">${percFem.toFixed(1)}%</span></div>`,
                  `<div class="tooltip-masc">Masculino: <span class="notbold">${percMasc.toFixed(1)}%</span></div>`]
            } else {
               const agg = tooltipLookup.get(muniCode) || {nutrient:0, total:0};
               const total = agg.total;
               const nutrientVal = agg.nutrient;
               const perc = total > 0 ? (nutrientVal/total)*100 : 0;
               htmlContent = [`<div class="tooltip-title">${d.properties.name}: <span class="notbold">${perc.toFixed(1)}%</span></div>`]
            }
           
           tooltip.classed("hidden",false)
                  .classed("opacity-0", false)
                  .classed("opacity-100", true)
                  .html(htmlContent.join(''))
                  .style("left", (event.clientX + 5) + "px")
                  .style("top", (event.clientY - 28) + "px");
           d3.select(this).attr("stroke-width", 2);
        })
        .on("mousemove", G.moveTooltip)
        .on("mouseout", function(event, d) {
           tooltip
            .classed("opacity-100", false)
            .classed("opacity-0",   true)
            .classed("hidden",      true);
           d3.select(this).attr("stroke-width", 1);
        });
     
      G.legendasMapa(mapContainer,colorScale,minVal,maxVal);

      // alerta de volta à visão estadual
      if (d3.select(mapContainer).selectAll(".alerta-mapa").empty()) {
         d3.select(mapContainer)
         .append("div")
         .attr("class", "alerta-mapa alerta-mapa-base")
         .text("⚠️Clique com o botão direito do mouse para retornar à visualização estadual");
      }
   });
   }

  
  // =======================
  // VISÃO REGIÃO SAÚDE (USANDO OS MESMOS CONTAINERS)
  // =======================
  function initHealthRegionMap(uf:string) {
    currentMode = "healthRegion";
    currentUF = uf;
    LimpaMapa();

   // mostra o container de divisões
   containerDivisao.classed("hidden", false);
   selectModo.value = "saude";

   // ao mudar o modo (federativa ↔ saude)
   selectModo.onchange = () => {
      if (selectModo.value === "saude") {
         initHealthRegionMap(currentUF);
      } else {
         initCidadesMap(currentUF);
      }
   };

     
  
    d3.select("#mapaRegional")
      .insert("h2", ":first-child")
      .text(`${G.ufLabel[uf]} – Regiões de Saúde`)
      .classed("text-center font-bold", true);
       
    // re-binde dos filtros gerais
    AtualizarMapa(uf);
  
    // desenha pela primeira vez
    updateHealthRegionMap(uf);
  }
  
  // -----------------------
  // atualiza VISÃO REGIÃO DE SAÚDE
  // -----------------------
  
  function updateHealthRegionMap(uf:string): void {
    const selectedYear  = +selectAno.value;
    const selectedSexo  = selectSexo.value;
    const selectedNutri = selectNutricional.value;
    const selectedFase  = selectFase.value;
        
    // 1) carrega o GeoJSON de regiões de saúde para este UF
    const geojsonFile = G.stateRGeojsonFiles[uf];

    d3.json<RegionCollection>(geojsonFile).then(geo => {
      // 2) filtra e agrega dados usando db_region (você deve ter feito o join db_final ↔ db_region em memória)
      //    Assumindo que você já carregou o CSV db_region.csv em global regionData
      let stateCSV = allData.filter(
         d =>  d.UF === uf 
           && +d.ANO === +selectedYear 
           && d.fase_vida === selectedFase
      );
      // junta regionData para obter regional_id
      const merged = stateCSV.map(d => {
        const reg = regionInfo.find(r => r.municipio_id_sdv === d.codigo_municipio);
        return Object.assign({}, d, { regional_id: reg ? reg.regional_id : null });
      }).filter(d => d.regional_id);
  
      // 3) rollup por regional_id em vez de codigo_municipio
      let agg:any;
      agg = d3.rollup(
          merged,
          v => {
            const catSum   = d3.sum(v, d => +d[selectedNutri]);
            const totalSum = d3.sum(v, d =>
               (+d.baixo_peso)
             + (+d.eutrofico)
             + (+d.sobrepeso)
             + (+d.obesidade_G_1)
             + (+d.obesidade_G_2)
             + (+d.obesidade_G_3)
            );
            return totalSum > 0 ? (catSum/totalSum)*100 : 0;
          },
          d => d.regional_id
      );
  
      // 4) mesmo código da cor, path e projeção da visão municipal,
      //    mas usando geo.features (regiões de saúde) e agg.get(feature.properties.regi_id)
      const values = Array.from(agg.values() as Iterable<number>);
      const minVal = d3.min(values), maxVal = d3.max(values);
      const colorScale = G.getColorScale(selectedSexo, minVal, maxVal);
      const border   = { "Todos":"#b982a1","Fem":"#4682B4","Masc":"#DB7093" }[selectedSexo] || "#ccc";
      
      
      geo.features.forEach(f => {
        const key = String(f.properties.reg_id);
        f.properties.value = agg.get(key) || 0;
      });

      // --- AGREGAÇÃO para o tooltip, idêntica à do mapa de municípios ---
      const regionAllData = merged.filter(d => +d.ANO === selectedYear);
      const tooltipLookup = d3.rollup(
        regionAllData,
        v => ({
          nutrient: d3.sum(v, d => +d[selectedNutri]),
          total: d3.sum(v, d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)),
          fem:   d3.sum(v.filter(d => d.SEXO === "Fem"), d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3)),
          masc:  d3.sum(v.filter(d => d.SEXO === "Masc"), d => (+d.baixo_peso)+(+d.eutrofico)+(+d.sobrepeso)+(+d.obesidade_G_1)+(+d.obesidade_G_2)+(+d.obesidade_G_3))
        }),
        d => d.regional_id
      );
  
      let svg = d3.select("#mapaRegional svg");
      if (svg.empty()) {
        svg = d3.select("#mapaRegional")
                .append("svg")
                  .attr("width", G.width)
                  .attr("height", G.height);
      }
  
      svg.selectAll("path")
         .data(geo.features)
         .join("path")
           .attr("class", "regiao-saude")
           .attr("d", d3.geoPath().projection(
              d3.geoMercator().fitSize([G.width,G.height], geo)
           ))
           .attr("fill", d => {
             return d.properties.value === 0
             ? "#ccc"
             : colorScale(d.properties.value);
           })
           .attr("stroke", G.getStrokeColor[selectedSexo])
           .attr("stroke-width", 1)
           .on("mouseover", function(event, d) {
               // 1) pega a agregação por região
               const key         = String(d.properties.reg_id);
               const aggOver     = tooltipLookup.get(key) || { nutrient:0, total:0, fem:0, masc:0 };
               const percFem     = aggOver.fem/aggOver.total*100;
               const percMasc    = aggOver.masc/aggOver.total*100;
               const regPerc     = aggOver.nutrient/aggOver.total*100;

   
               // 2) monta o mesmo html de antes
               const htmlContent =  `<strong>${d.properties.nome}</strong>: <span style="font-size:15px;">${regPerc.toFixed(1)}%<br>
                    <span style="color:#DC143C;">Feminino: ${percFem.toFixed(1)}%</span><br>
                    <span style="color:#4169E1;">Masculino: ${percMasc.toFixed(1)}%</span></span>`;
   
               // 3) exibe com as mesmas classes/transitions
               tooltip
                 .classed("hidden", false)
                 .classed("opacity-0", false)
                 .classed("opacity-100", true)
                 .html(htmlContent)
                 .style("left", (event.clientX + 5) + "px")
                 .style("top",  (event.clientY - 28) + "px")
                 .transition().duration(200).style("opacity","1");
   
               d3.select(this).attr("stroke-width", 2);
           })
           .on("mousemove", G.moveTooltip)
           .on("mouseout", function() {
           tooltip.classed("opacity-0", true)
                  .classed("hidden",true);
           d3.select(this).attr("stroke-width", 1);
           })
           .on("contextmenu", (event) => {            
            event.preventDefault();
            event.stopPropagation();
            initEstadosMap();
           });
           
      // 5) legenda: igual à visão municipal
      G.legendasMapa(mapContainer,colorScale,minVal,maxVal);
  
        // Alerta
     if(d3.select("#mapaRegional").selectAll(".alerta-mapa").empty()){
        d3.select("#mapaRegional")
           .append("div")
              .attr("class","alerta-mapa alerta-mapa-base")
              .text("⚠️Clique com o botão direito do mouse para retornar à visualização estadual");
        }
     });
   }
   // Clique direito global do mapa
   /* d3.select(mapContainer)
   .on("contextmenu", (event: MouseEvent) => {
      event.preventDefault();
      if (currentMode === "brasil" || currentMode === "estados") {
         initBrasilMap();
         d3.select(mapContainer).selectAll("*").remove();
         d3.select(".legendRegional").selectAll("*").remove();
      } else if (currentMode === "cidades" || currentMode === "healthRegion") {
         initEstadosMap();
         d3.select(mapContainer).selectAll("*").remove();
         d3.select(".legendRegional").selectAll("*").remove();
      }
   }); */
   }
      

