import * as d3 from "d3";
import * as G from "./global";
import { totalmem } from "os";

// Tipagem para as linhas do CSV principal
interface TemporalDataRow {
  UF:                 string;
  codigo_municipio:   string;
  municipio:          string;
  ANO:                string;
  SEXO:               string;
  fase_vida:          string;
  total:              string;
  // indicadores  
  baixo_peso:         number;
  eutrofico:          number;
  obesidade_G_1:      number;
  obesidade_G_2:      number;
  obesidade_G_3:      number;

  magreza_acentuada:  number;
  magreza:            number;
  obesidade:          number;
  obesidade_grave:    number;

  
  [key: string]: string | number;
}

interface TemporalPoint {
  ano:   string;
  valor: number;
}


// Tipagem para as linhas do CSV de regiões
interface RegionDataRow {
  municipio_id_sdv: string;
  regional_id: string;
  uf: string;
  nome_regiao: string;
}

/**
 * Inicializa o módulo de Análise Temporal
 * @param containerDivisao - elemento onde o chart será injetado
 * @param selectUF - select de UFs
 * @param selectMunicipio - select de Municípios
 * @param selectSexo - select de Sexo
 * @param selectFase - select de Fase de Vida
 * @param selectIndicador - select de Indicador
 * @param selectModo - select de Divisão (Saúde/Federativa)
 * @param labelMunicipio - label do selectMunicipio para mostrar/ocultar
 */
export function initTemporal(
  containerDivisao: HTMLElement,
  selectUF: HTMLSelectElement,
  selectMunicipio: HTMLSelectElement,
  selectSexo: HTMLSelectElement,
  selectFase: HTMLSelectElement,
  selectIndicador: HTMLSelectElement,
  selectModo: HTMLSelectElement,
  labelMunicipio: HTMLLabelElement,
  labelModo: HTMLLabelElement,
  titleEl: HTMLElement
) {
  // Mapa para resolver qual região de saúde pertence a cada município (código)
  const regionMap: Map<string, string> = new Map();

  let allDataTemporal: TemporalDataRow[] = [];
  const municipiosPorUF: Record<string, Map<string,string>> = {};
  let regionDataTemporal: RegionDataRow[] = [];
  const regionPorUF: Record<string, Map<string, string>> = {};

  // 1) Cria as duas Promises de carregamento
const promiseRegioes = d3.csv<RegionDataRow>(
  G.csvRegionUrl,
  row => ({
    municipio_id_sdv: row.municipio_id_sdv,
    regional_id:      row.regional_id,
    uf:               row.estado_abrev,
    nome_regiao:      row.regional_nome
  })
);

const promiseDados = d3.csv<TemporalDataRow>(
  G.csvDataUrl,
  row => ({
    UF:                 row.UF,
    codigo_municipio:   row.codigo_municipio,
    municipio:          row.municipio,
    ANO:                row.ANO,
    SEXO:               row.SEXO,
    fase_vida:          row.fase_vida,
    valor:             +row.valor,
    total:              row.total,
    baixo_peso:        +row.baixo_peso,
    eutrofico:         +row.eutrofico, 
    obesidade_G_1:     +row.obesidade_G_1, 
    obesidade_G_2:     +row.obesidade_G_2, 
    obesidade_G_3:     +row.obesidade_G_3, 
    magreza_acentuada: +row.magreza_acentuada,
    magreza:           +row.magreza,
    obesidade:         +row.obesidade,
    obesidade_grave:   +row.obesidade_grave
  })
);

  Promise.all([ promiseRegioes, promiseDados ])
  .then(([ regioes, dados ]) => {
    // popula seus arrays/maps
    regionDataTemporal = regioes;
    regionMap.clear();
    regioes.forEach(r =>
      regionMap.set(r.regional_id, r.municipio_id_sdv)
    );

    allDataTemporal = dados;

    // inicializa selects e gráficos
    popularSelects();
    atualizarGrafico();
    atualizarTitulo();

    // Listeners para refazer gráfico ao mudar filtros
    selectModo.addEventListener("change", () => {
      atualizarGrafico();
      atualizarTitulo();
      FiltroChangerMunReg();
      labelMunicipio.textContent = selectModo.value === 'federativa' 
        ? 'Municípios'
        : 'Regiões de Saúde';
    });
    [selectUF, selectMunicipio, selectSexo, selectFase, selectIndicador]
      .forEach(sel => sel.addEventListener("change", () => {
        FiltroChangerMunReg();
        atualizarGrafico();
        atualizarTitulo();
      }));
    console.log("📥 Ambos os CSVs carregaram", regioes.length, "regiões e", dados.length, "registros temporais");
    console.table(regioes.slice(0,5));
    console.table(dados.slice(0,5));
  });

  // Popula selects de UF, Mun, Sexo, Fase e Indicador
  function popularSelects(): void {
    // --- UF ---
    const ufs = Array.from(new Set(allDataTemporal.map(d => d.UF))).sort();
    selectUF.innerHTML = "<option value=''>Brasil</option>";
    ufs.forEach(uf => {
      const o = document.createElement("option");
      o.value = uf;
      o.text  = G.ufLabel[uf] + ` (${uf})` || uf;
      selectUF.appendChild(o);
    });

    // --- Carrega cidades ou regiões a depender do modo ---
    FiltroChangerMunReg();

    // --- Sexo ---
    selectSexo.innerHTML = "";
    ["Todos","Fem","Masc"].forEach(key => {
      const o = document.createElement("option");
      o.value = key;
      o.text  = G.sexoLabel[key] || key;
      selectSexo.appendChild(o);
    });

    // --- Fase ---
    selectFase.innerHTML = "";
    Object.entries(G.faseLabel).forEach(([key,label]) => {
      const o = document.createElement("option");
      o.value = key;
      o.text  = label;
      selectFase.appendChild(o);
    });

    // --- Indicador ---
    function PopulateNutri(){
      selectIndicador.innerHTML = "";
      const NomeIndicador = selectFase.value === "adulto" 
      ? G.nomesIndicadoresAdulto 
      : G.nomesIndicadoresAdolescente;

    Object.entries(NomeIndicador).forEach(([key,label]) => {
      const o = document.createElement("option");
      o.value = key;
      o.text  = label;
      selectIndicador.appendChild(o);
    });
    }
    PopulateNutri();
    selectFase.addEventListener("change", PopulateNutri);

    // --- Divisão ---
    selectModo.innerHTML = "";
    ["federativa","saude"].forEach(val => {
      const o = document.createElement("option");
      o.value = val;
      o.text  = val === "federativa" ? "Divisão Federativa" : "Regiões de Saúde";
      selectModo.appendChild(o);
    });
  }

  function FiltroChangerMunReg() : void {
    console.log("UF selecionada:", selectUF.value,
            "→ vai filtrar em regionDataTemporal.filter(d => d.uf === …)");

    [labelMunicipio,selectMunicipio,labelModo,selectModo].forEach(muni => { 
      muni.classList.toggle("hidden", selectUF.value === "" );
    });
    const modo = selectModo.value;
    const filtroAtualizar = modo === "federativa" ? atualizarMunicipios : atualizarRegioes;

    return filtroAtualizar(selectUF.value);
  };

  //Atualiza lista de Regiões conforme UF
  function atualizarRegioes(ufSelecionada: string, manterSelecionado = false): void{
    
    
    if (!regionPorUF[ufSelecionada]){
      regionPorUF[ufSelecionada] = new Map();
      regionDataTemporal
        .filter(d => d.uf === ufSelecionada)
        .forEach(d => {
          regionPorUF[ufSelecionada]!.set(d.regional_id,d.nome_regiao);
        })
    }
    const RegMap = regionPorUF[ufSelecionada];
    const prev = selectMunicipio.value;
    selectMunicipio.innerHTML = "";
    console.log("→ Construindo mapa para UF", ufSelecionada, ":",
            Array.from(RegMap?.entries()||[]));
    Array.from(RegMap!.entries())
      .sort((a,b) => a[1].localeCompare(b[1]))
      .forEach(([code,name]) => {
        const o = document.createElement("option");
        o.value = code;
        o.text = name;
        selectMunicipio.appendChild(o);
      });

    if (manterSelecionado && Array.from(selectMunicipio.options).some(opt => opt.value === prev)) {
      selectMunicipio.value = prev;
    }

  }

  // Atualiza lista de municípios conforme UF
  function atualizarMunicipios(ufSelecionada: string, manterSelecionado = false): void {
    
    // Agrupa por UF
    if (!municipiosPorUF[ufSelecionada]) {
      municipiosPorUF[ufSelecionada] = new Map();
      allDataTemporal
        .filter(d => d.UF === ufSelecionada)
        .forEach(d => {
          municipiosPorUF[ufSelecionada]!.set(d.codigo_municipio, d.municipio);
        });
    }
    const mapMun = municipiosPorUF[ufSelecionada];
    const prev = selectMunicipio.value;
    selectMunicipio.innerHTML = "<option value=''>Todos</option>";
    console.log("→ Construindo mapa para UF", ufSelecionada, ":",
            Array.from(mapMun?.entries()||[]));

    Array.from(mapMun!.entries())
      .sort((a,b) => a[1].localeCompare(b[1]))
      .forEach(([code,name]) => {
        const o = document.createElement("option");
        o.value = code;
        o.text  = name;
        selectMunicipio.appendChild(o);
      });
    if (manterSelecionado && Array.from(selectMunicipio.options).some(opt => opt.value === prev)) {
      selectMunicipio.value = prev;
    }
  }

  // Atualiza o título de acordo com filtros
  function atualizarTitulo(): void {
    const uf   = selectUF.value || "Brasil";
    const fase = G.faseLabel[selectFase.value] || "";
    const sexo = selectSexo.value === "Todos" ? "" : G.sexoLabel[selectSexo.value]    || "";
    const indi = G.nomeAmigavel[selectIndicador.value] || "";
    const cidade = selectMunicipio.value === "Todos" ? "" : selectMunicipio.name || "";

    const titulo = `Análise Temporal de ${indi} em ${fase} ${sexo} - ${cidade} ${G.ufLabel[uf]}`;
    titleEl.textContent = titulo;
  }

  /**
   * Desenha o gráfico temporal dentro do containerDivisao já tipado e limpo
   * @param dadosRecord Objeto com chaves "Fem"|"Masc"|"Todos" e cada um um array de { ano, valor }
   * @param anos       Array de anos em string, na ordem que estiverem no eixo X
   * @param maxY       Valor máximo de Y (prevalência) para ajustar a escala
   */
  function atualizarGrafico(): void {
    // Captura filtros
    const uf       = selectUF.value;
    const modo     = selectModo.value;       // “federativa” | “saude”
    const sexo     = selectSexo.value;
    const fase     = selectFase.value;
    const muni     = selectMunicipio.value; // cidade ou região de saúde | depende do modo
    const indicador= selectIndicador.value;

    
    // Filtra o dataset
    const dadosFiltrados = allDataTemporal.filter(d => {
      if (fase && d.fase_vida !== fase)         return false;
      if (sexo !== "Todos" && d.SEXO !== sexo)   return false;
      if (uf && d.UF !== uf)                     return false;
      if (muni) {
        if (modo === "federativa") {
          if(String(d.codigo_municipio) !== muni) return false;
        } else {
          const membros = regionMap[d.codigo_municipio] || [];
          if (!membros.includes(String(d.codigo_municipio))) return false;
        }
      }
      return true;
    });

    // agrupar entrevistados por ano
    const totalEntrevistadosPorAno = d3.rollup(
      dadosFiltrados,
      v => d3.sum(v,d => +d.total),
      d => d.ANO
    );

    if (totalEntrevistadosPorAno.size === 0){
      desenharGraficoTemporal({Masc:[], Fem: [], Todos: []},[],100);
    }


    let colunasIndicadores: (keyof TemporalDataRow)[];
    if (selectFase.value === "adolescente") {
      colunasIndicadores = G.filtroNutricionalFase["adolescente"];
    } else {
      colunasIndicadores = G.filtroNutricionalFase["adulto"];
    }

    // Gera array de anos ordenados
    type DadosGrafico = Record<string, TemporalPoint[]>;
    const anos = Array.from(new Set(dadosFiltrados.map(d => d.ANO))).sort();
    let dadosGrafico: DadosGrafico = {};
    let maxPct = 0;

    if(selectSexo.value === "Todos"){
      dadosGrafico = {Masc: [], Fem: [], Todos: []};

    anos.forEach(ano => {
      let masc = dadosFiltrados.filter(d=> d.ANO === ano && d.SEXO === "Masc");
      let fem = dadosFiltrados.filter(d=> d.ANO === ano && d.SEXO === "Fem");

      let totalEntrevistadosAno = totalEntrevistadosPorAno.get(ano) || 0;

      if (totalEntrevistadosAno > 0) {
            let valorMasc = masc.reduce((sum, d) => sum + Number(d[indicador] || 0), 0);
            let valorFem = fem.reduce((sum, d) => sum + Number(d[indicador] || 0), 0);

            // 🔹 Normalizar os valores como porcentagem do total de entrevistados NO ANO
            let percMasc = (valorMasc / totalEntrevistadosAno) * 100;
            let percFem = (valorFem / totalEntrevistadosAno) * 100;
            let percTodos = ((valorMasc + valorFem) / totalEntrevistadosAno) * 100;

            maxPct = Math.max(maxPct, percMasc, percFem, percTodos);

            dadosGrafico.Masc.push({ ano, valor: percMasc });
            dadosGrafico.Fem.push({ ano, valor: percFem });
            dadosGrafico.Todos.push({ ano, valor: percTodos });
        
    }  });
  } else{
    dadosGrafico[sexo] = [];

    anos.forEach(ano => {
          let dadosPorSexo = dadosFiltrados.filter(d => d.ANO === ano && d.SEXO === sexo);
          let totalEntrevistadosAno = totalEntrevistadosPorAno.get(ano) || 0;
          if (totalEntrevistadosAno > 0) {
              let valor = dadosPorSexo.reduce((sum, d) => sum + Number(d[indicador] || 0), 0);
              let perc = (valor / totalEntrevistadosAno) * 100;
              maxPct = Math.max(maxPct, perc);
              dadosGrafico[sexo].push({ ano, valor: perc });
          }
      });

  }

    // 5) Chama o render tipado
    desenharGraficoTemporal(dadosGrafico, anos, maxPct);
  }



  // 6) Função de render tipada e usando containerDivisao
  function desenharGraficoTemporal(
    dadosRecord: Record<"Fem"|"Masc"|"Todos", TemporalPoint[]>,
    anos: string[],
    maxY: number
  ): void {
    // Limpa tudo
    d3.select(containerDivisao).selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const internalWidth  = 700;
    const internalHeight = 355;

    // SVG responsivo
    const svg = d3.select(containerDivisao)
      .append("svg")
        .attr("viewBox", `0 0 ${internalWidth + margin.left + margin.right} ${internalHeight + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("w-full", true)
        .classed("h-auto", true);

    const chartArea = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3.scalePoint<string>()
      .domain(anos)
      .range([0, internalWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, maxY])
      .range([internalHeight, 0]);

    // Grupos de fundo
    const linesGroup   = chartArea.append("g");
    const circlesGroup = chartArea.append("g");
    const labelsGroup  = chartArea.append("g");

    // Eixos
    chartArea.append("g")
      .attr("transform", `translate(0,${internalHeight})`)
      .call(d3.axisBottom(x));
    chartArea.append("g")
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d}%`));

    // Rótulo Y
    chartArea.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -internalHeight/2)
      .attr("y", -margin.left -3)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .classed("y-axis-label", true)
      .text("Prevalência");

    // Linhas de grid
    const ticks = y.ticks(6);
    ticks.slice(0, -1).forEach(tv => {
      linesGroup.append("line")
        .attr("x1", 0).attr("x2", internalWidth)
        .attr("y1", y(tv)).attr("y2", y(tv))
        .classed("grid-line", true);
    });

    // Gerador de linha
    const lineGen = d3.line<TemporalPoint>()
      .x(d => x(d.ano)!)
      .y(d => y(d.valor));

    // Para cada sexo
    (["Fem","Masc","Todos"] as const).forEach(sexo => {
      const key = sexo === "Todos" ? "all" : sexo.toLowerCase();
      const serie = dadosRecord[sexo];
      const pathString = lineGen(serie);
      console.log(sexo, "->", pathString);

      /* purgecss start ignore */
      /* fill-primary fill-secondary fill-accent
        stroke-primary stroke-secondary stroke-accent */
      /* purgecss end ignore */
        
      const cores = {all: 'primary', fem: 'secondary', masc: 'accent'};

      // LINHA
      linesGroup.append("path")
        .datum(serie)
        .attr("fill", "none")
        .classed(`stroke-${cores[key]}`,true)
        .attr("stroke-width", 2)
        .attr("d", lineGen);

      // CÍRCULOS (genérico, com tipagem para remover 'unknown')
      circlesGroup.selectAll<SVGCircleElement, TemporalPoint>(`.circle-${key}`)
        .data(serie)
        .enter()
        .append("circle")
          .attr("class", `circle-${key}`)
          .attr("cx", d => x(d.ano)!)
          .attr("cy", d => y(d.valor))
          .attr("r", 4)
          .classed(`fill-${cores[key]}`,true)
          .on("mouseover", (event, d) => {
            d3.select(event.currentTarget)
              .transition().duration(100).attr("r", 6);
            labelsGroup.selectAll<SVGGElement, TemporalPoint>(`.label-${key}`)
              .filter(ld => ld.ano === d.ano)
              .classed("visible", true);
            G.showTooltip(`<strong>${d.ano}</strong><br/>${d.valor.toFixed(1)}%`, event);
          })
          .on("mouseout", (event, d) => {
            d3.select(event.currentTarget)
              .transition().duration(100).attr("r", 4);
            labelsGroup.selectAll<SVGGElement, TemporalPoint>(`.label-${key}`)
              .filter(ld => ld.ano === d.ano)
              .classed("visible", false);
            G.hideTooltip();
          });
     

      // LABELS
      const labelGroups = labelsGroup
        .selectAll<SVGGElement, TemporalPoint>(`.label-${key}`)
        .data(serie)
        .enter()
        .append("g")
          .attr("class", `label-${key}`)
          .classed("invisible", true);

      // 1) append do rect
      labelGroups.append("rect")
        .attr("x", d => x(d.ano)! - 20)
        .attr("y", d => y(d.valor) - 30)
        .attr("width", 40)
        .attr("height", 20)
        .classed("fill-white stroke-gray-300", true);

      // 2) append do text
      labelGroups.append("text")
        .attr("x", d => x(d.ano)!)
        .attr("y", d => y(d.valor) - 15)
        .attr("text-anchor", "middle")
        .classed("text-[17px]", true)
        .text(d => d.valor.toFixed(1) + "%");

      });
    }
  }