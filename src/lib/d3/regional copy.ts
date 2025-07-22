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
  total: string;
  SEXO: string;
  fase_vida: string;
  // demais campos...
  [key: string]: string;
}

// Tipagem para info de regiões de saúde
interface RegionInfo {
  municipio_id_sdv: string;
  regional_id: string;
  nome_regiao: string;
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
  let lastGeoDataCountry: any, lastGeoDataBrasil: any;
  const regionInfo: RegionInfo[] = [];
  const regionMap = new Map<string,string>();
  let allData: RegionalDataRow[] = [];
  const tooltip = d3.select<HTMLDivElement, unknown>(".tooltip");

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
      : "estados";
    const displayNutri = G.nomeAmigavel[nutricional] || nutricional;
    const labelFase    = G.faseLabel[fase] || fase;
    const labelSexo    = G.sexoLabel[sexo] || sexo;

    const titulo = `Mapeamento Regional de ${displayNutri} em ${labelFase} ${labelSexo} - ${lugar} ${ano}`;
    titleEl.textContent = titulo;
  }

  // Ajusta os indicadores no select de Nutricional conforme fase de vida
  function atualizarEstadoNutricionalRegional(): void {
    const indicadorReg = selectFase.value === "adulto"
      ? G.nomesIndicadoresAdulto
      : G.nomesIndicadoresAdolescente;
    selectNutricional.innerHTML = Object.entries(indicadorReg)
      .map(([valorR, nomeExibicaoR]) =>
        `<option value="${valorR}">${nomeExibicaoR}</option>`
      ).join("");
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
      total:            row.total,
      // caso existam outras colunas no CSV que você use, adicione-as aqui
      })),
    d3.csv<RegionInfo>(G.csvRegionUrl, row => ({
      municipio_id_sdv: row.municipio_id_sdv,
      regional_id:      row.regional_id,
      nome_regiao:      row.nome_regiao || row.nome,
      uf:               row.uf
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
   console.log(allData.slice(0,10).map(d => d.ANO))
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
    selectFase.onchange = () => reloadMap();
    selectNutricional.onchange = () => reloadMap();
    selectModo.onchange = () => reloadMap();
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
         // Se você usou `loadEstadoMap`:
         initCidadesMap(currentUF!);
         // ou, se você renomeou para `initCidadesMap`:
         // initCidadesMap(currentUF!);
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

   currentMode = "brasil";
   currentUF  = null;

   // carrega o geojson do Brasil
   d3.json<any>("data/geojson/brazil.json").then(geoData => {
      lastGeoDataCountry = geoData;

      // atualiza quadro de números (mulheres, homens, total) e título
      atualizarQuadroRegional();
      atualizarTituloRegional();

      // ao mudar fase de vida
      selectFase.onchange = () => {
         atualizarEstadoNutricionalRegional();
         atualizarQuadroRegional();
         updateBrasilMap(lastGeoDataCountry);
         atualizarTituloRegional();
      };

      // ao mudar ano, sexo ou indicador nutricional
      [selectAno, selectSexo, selectNutricional].forEach(sel => {
         sel.onchange = () => {
         atualizarQuadroRegional();
         updateBrasilMap(lastGeoDataCountry);
         atualizarTituloRegional();
         };
      });

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
      const nutricionalName = filtroNutr === "Total"
         ? "Total"
         : nomesIndicadores[filtroNutr] || filtroNutr;

      const nutrCount = filtroNutr === "Total"
         ? totalAll
         : d3.sum(arrAll, d => +d[filtroNutr]);
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
         .attr("stroke", "#fff")        // ou remova o stroke interno: .attr("stroke", "none")
         .attr("stroke-width", 1)
         .on("mouseover", (event, d) => {
            // mesmo tooltip que você já tinha para "estados"
            showTooltipBrasil(event, d);
         })
         .on("mouseout", () => {
            G.hideTooltip();
         })
         .on("click", () => {
            // aqui, se quiser navegar para estados:
            initEstadosMap();
         })
         .on("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            initBrasilMap();
            d3.select(mapContainer).selectAll("*").remove();
            d3.select(".legendRegional").selectAll("*").remove();
         });

      // 8) Atualiza os counters no DOM
      valorMulheresEl.textContent = pctFem ? pctFem.toFixed(1) + "%" : "–";
      valorHomensEl.textContent   = pctMasc ? pctMasc.toFixed(1) + "%" : "–";
      valorTodosEl.textContent    = nutrPct.toFixed(1) + "%";
   }

     
  // === Estados ===
   function initEstadosMap(): void {
      // oculta subviews
      d3.select(mapContainer).selectAll(".hidden");

      // limpa h2 e alertas antigos
      d3.select(mapContainer).selectAll("h2, .alerta-mapa").remove();

      // container para alertas
      const container = d3.select(mapContainer);
      container.append("div")
         .attr("class", "alerta-mapa alerta-mapa-base")
         .text("⚠️Clique com o botão esquerdo do mouse no estado para visualizá-lo");
      container.append("div")
         .attr("class", "alerta-mapa alerta-extra alerta-mapa-base")
         .text("Clique com o botão direito do mouse para voltar à visualização Nacional");

      currentMode = "estados";
      // carrega geojson de estados
      d3.json<any>("data/geojson/br_states.json").then(geoData => {
         lastGeoDataBrasil = geoData;

         // listeners de filtro (ano, sexo, nutricional)
         [selectAno, selectSexo, selectNutricional].forEach(sel => {
         sel.onchange = () => {
            updateEstadosMap(lastGeoDataBrasil);
            atualizarTituloRegional();
            atualizarQuadroRegional();
         };
         });
         selectFase.onchange = () => {
         atualizarEstadoNutricionalRegional();
         updateEstadosMap(lastGeoDataBrasil);
         atualizarTituloRegional();
         atualizarQuadroRegional();
         };

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
            .attr("stroke", G.getStrokeColor(filtroSexo))
            .attr("d", d => pathGen(d)!)
            .attr("fill", d => {
            const val = valoresMapa.get(d.id as string);
            return val !== undefined ? colorScale(val) : "#ccc";
            })
         .on("mouseover", (event, d: any) => {
            const id = d.id as string;
            const nome = G.ufLabel[id] || id;
            const agg = stateAggregates.get(id) || { total: 0, fem: 0, masc: 0, nutrient: 0 };
            let content: string[] = [];
            if (filtroSexo === "Todos") {
               const total = agg.total!;
               const nutrientSum = agg.fem! + agg.masc!;
               const statePerc = total > 0 ? (nutrientSum/total)*100 : 0;
               const percFem = nutrientSum > 0 ? (agg.fem!/nutrientSum)*100 : 0;
               const percMasc = nutrientSum > 0 ? (agg.masc!/nutrientSum)*100 : 0;
               content = [
                  `<div class="tooltip-title">${nome}</div>`,
                  `<div class="tooltip-subtitle">${statePerc.toFixed(1)}%</div>`,
                  `<div class="tooltip-fem">Feminino: ${percFem.toFixed(1)}%</div>`,
                  `<div class="tooltip-masc">Masculino: ${percMasc.toFixed(1)}%</div>`
               ];
         } else {
            const total = agg.total!;
            const val = (agg.nutrient as number) || 0;
            const perc = total > 0 ? (val/total)*100 : 0;
            content = [
               `<div class="tooltip-title">${nome}</div>`,
               `<div class="tooltip-subtitle">${perc.toFixed(1)}%</div>`
            ];
         }
         G.showTooltip(`<div class="tooltip-content">${content.join('')}</div>`, event);
         d3.select(event.currentTarget as Element).attr("stroke-width", 2);
         })
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
            d3.select(mapContainer).selectAll("*").remove();
            d3.select(".legendRegional").selectAll("*").remove();
         });

      // Legenda lateral
      const legendSel = d3.select(mapContainer.parentElement!).select<HTMLElement>('.legendRegional');
      const legendWidth    = 20;
      const legendHeight   = 200;
      legendSel.selectAll("*").remove();
      const legendSvg = legendSel.append("svg")
         .attr("width", 120)
         .attr("height", 250);
      const grad = legendSvg.append("defs").append("linearGradient")
         .attr("id", "legend-gradient")
         .attr("x1","0%")
         .attr("y1","100%")
         .attr("x2","0%")
         .attr("y2","0%");
      grad.append("stop").attr("offset","0%").attr("stop-color", colorScale(minVal));
      grad.append("stop").attr("offset","100%").attr("stop-color", colorScale(maxVal));
      legendSvg.append("rect")
         .attr("x",10).attr("y",10)
         .attr("width",legendWidth)
         .attr("height",legendHeight)
         .style("fill","url(#legend-gradient)");
      const legendScale = d3.scaleLinear()
         .domain([minVal, maxVal])
         .range([legendHeight, 0]);

      // eixo direito tip-safe
      const legendAxis = d3.axisRight(legendScale)
      .ticks(4)
      .tickFormat((d: number, i: number):string => {return `${d.toFixed(0)}%`;});
      

      // adiciona o <g> para o eixo e chama o legendAxis diretamente
      const gLegend = legendSvg.append("g")
         .attr("transform", `translate(${legendWidth + 20}, 10)`);

      // aqui você *invoca* o gerador como função, não via .call() do D3
      gLegend.call(legendAxis);

      // rótulo rotacionado
      legendSvg
      .append("text")
         .attr("transform", `translate(${legendWidth + 65}, ${10 + legendHeight/2}) rotate(-90)`)
         .attr("text-anchor", "middle")
         .attr("font-size", "18px")
         .text("Prevalência (%)");

      
   }

  // === Municípios ou Regiões de Saúde ===
  // =======================
   // VISÃO MUNICIPAL (Divisão Federativa) OU Regiões de Saúde
   // =======================
   function initCidadesMap(uf: string): void {
   currentMode = "cidades";
   currentUF = uf;

   // mostra o container de divisões
   d3.select(mapContainer).classed("hidden", false);
   selectModo.value = "federativa";

   // ao mudar o modo (federativa ↔ saude)
   selectModo.onchange = () => {
      if (selectModo.value === "saude") {
         initHealthRegionMap(uf);
      } else {
         initCidadesMap(uf);
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

   // filtro fase de vida
   selectFase.onchange = () => {
      atualizarEstadoNutricionalRegional();
      updateCidadesMap(uf);
      atualizarTituloRegional();
      atualizarQuadroRegional();
   };

   // filtros ano, sexo e nutricional
   [selectAno, selectSexo, selectNutricional].forEach(sel => {
      sel.onchange = () => {
         updateCidadesMap(uf);
         atualizarTituloRegional();
         atualizarQuadroRegional();
      };
   });

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
      let stateCSV = allData.filter(d => d.UF === uf && d.fase_vida === filtroFase);
      stateCSV = stateCSV.filter(d => d.ANO === selectedYear);
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
      const borderColor = { Todos: "#b982a1", Fem: "#4682B4", Masc: "#DB7093" }[selectedSexo] || "#ccc";

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
         .attr("stroke", borderColor)
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
            d3.select(mapContainer).selectAll("*").remove();
            d3.select(".legendRegional").selectAll("*").remove();
         });

      // TODO: replicar aqui a lógica de tooltipLookup e G.showTooltip / G.hideTooltip
      // tal como no seu código original

      // reconstrução da legenda estadual (igual a updateEstadosMap)
      const legendSel = d3.select(mapContainer.parentElement!).select<HTMLElement>(".legendRegional");
      legendSel.selectAll("*").remove();
      // ... monte seu gradient e axis conforme já fez antes ...

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
  
    // limpa container e títulos, igual a loadEstadoMap
    d3.select("#mapaRegional").html("");
    d3.select("#legendRegional").html("");
  
    d3.select("#mapaRegional")
      .insert("h2", ":first-child")
      .text(`${G.ufLabel[uf]} – Regiões de Saúde`)
      .classed("text-center font-bold", true);
  
    // mostra o Divisão e seta padrão
    containerDivisao.classed("hidden", false);
    selectModo.value = "saude";
  
    // re-binde dos filtros gerais
    d3.select("#filtro-fasevida").on("change", () => {
      atualizarEstadoNutricionalRegional();
      updateHealthRegionMap(uf);
      atualizarTituloRegional();
      atualizarQuadroRegional();
    });
    ["#filtro-ano", "#filtro-sexo", "#filtroNutricional", "#filtro-divisao"]
      .forEach(sel => {
        d3.select(sel).on("change", () => {
          updateHealthRegionMap(uf);
          atualizarTituloRegional();
          atualizarQuadroRegional();
        });
      });
  
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
  
    containerDivisao.classed("hidden", false);
    // quando o usuário mudar o filtro “Divisão”, troca o mapa
    selectModo.addEventListener("change", () =>  {
     const modo = selectModo.value;
     if (modo === "saude") {
        initHealthRegionMap(uf);
     } else {
        initCidadesMap(uf);
     }
     });
  
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
      let agg;
      if (selectedNutri === "Total") {
        agg = d3.rollup(
          merged,
          v => d3.sum(v, d =>
             (+d.baixo_peso)
           + (+d.eutrofico)
           + (+d.sobrepeso)
           + (+d.obesidade_G_1)
           + (+d.obesidade_G_2)
           + (+d.obesidade_G_3)
          ),
          d => d.regional_id
        );
      } else {
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
      }
  
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
           .attr("stroke", G.getStrokeColor(selectedSexo))
           .attr("stroke-width", 1)
           .on("mouseover", function(event, d) {
               const name = d.properties.nome;
               const val  = d.properties.value;
               const display = selectedNutri === "Total"
                 ? formatNumber(val)
                 : `${val.toFixed(1)}%`;
               const content = [
                 `<div class="tooltip-title">${name}</div>`,
                 `<div class="tooltip-subtitle">${display}</div>`
               ];
               tooltip
                 .classed("hidden", false)
                 .html(`<div class="tooltip-content">${content.join('')}</div>`)
                 .style("left", (event.clientX + 5) + "px")
                 .style("top",  (event.clientY - 28) + "px")
                 .transition()
                 .duration(200)
                 .style("opacity", "1");
                 
               d3.select(this).attr("stroke-width", 2);
           })
           .on("mouseout", function() {
           tooltip.classed("opacity-0", true)
                  .classed("hidden",true);
           d3.select(this).attr("stroke-width", 1);
           })
           
      // 5) legenda: igual à visão municipal
     const legendContainer = d3.select("#legendRegional");
     legendContainer.selectAll("*").remove();
     const legendW = 20, legendH = 200;
     const legendSvg = legendContainer.append("svg")
     .attr("width", legendW + 80)
     .attr("height", legendH + 30);
  
     const grad = legendSvg.append("defs")
     .append("linearGradient")
        .attr("id", "healthRegion-gradient")
        .attr("x1", "0%").attr("y1", "100%")
        .attr("x2", "0%").attr("y2", "0%");
  
     grad.append("stop")
     .attr("offset", "0%")
     .attr("stop-color", colorScale(minVal));
     grad.append("stop")
     .attr("offset", "100%")
     .attr("stop-color", colorScale(maxVal));
  
     legendSvg.append("rect")
     .attr("x", 10).attr("y", 10)
     .attr("width", legendW).attr("height", legendH)
     .style("fill", "url(#healthRegion-gradient)");
  
     const legendScale = d3.scaleLinear<number,number>()
                           .domain([minVal, maxVal])
                           .range([legendH, 0]);
  
     const legendAxis = d3.axisRight<number>(legendScale)
                           .ticks(4)
                           .tickFormat((d: number) => {
                           // `d` é definitivamente `number`, não `NumberValue`
                           if (selectNutricional.value === "Total") {
                              return formatNumber(d);
    }
    return d.toFixed(0) + "%";
  });
  
     const gLegend = legendSvg
      .append("g")
         .attr("transform", `translate(${legendW+10}, 10)`);

      gLegend.call(legendAxis);
  
     legendSvg.append("text")
          .attr("transform", `translate(${legendW + 65}, ${10 + legendH/2}) rotate(-90)`)
          .attr("text-anchor", "middle")
          .attr("font-size", "18px")
          .text("Prevalência (%)");
  
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
   d3.select(mapContainer)
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
   });
   }
      

