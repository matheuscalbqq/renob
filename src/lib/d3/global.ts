import * as d3 from "d3";
import type { FeatureCollection } from "geojson";
import { json } from "d3-fetch";
import {hsl, hcl} from "d3-color";

// Tamanhos do SVG
export const width  = 800;
export const height = 450;

// URLs das fontes de dados
export const csvDataUrl    = "data/db_final.csv";
export const csvRegionUrl  = "data/db_region.csv";


export function resolveCssColor(prop: string): string {
  // 1) cria um elemento
  const el = document.createElement("div");
  // 2) injeta no DOM (pode ser invisível)
  document.body.append(el);
  // 3) aplica a var numa propriedade que o browser calcula (color, background-color, etc.)
  el.style.color = `hsl(var(${prop}))`;
  // 4) lê o valor computado (ex: "rgb(220, 20, 60)")
  const resolved = getComputedStyle(el).color;
  // 5) limpa
  document.body.removeChild(el);
  return resolved;
}

// 1) lê a cor-base em RGB/HSL e converte pra HCL

const mapping: Record<string,string> = {
    'Fem':   '--secondary',
    'Masc':  '--accent',
    'Todos': '--primary'
  };

export function getColorScale(sexo: string, min: number, max: number) {
   
  const base  = hsl(resolveCssColor(mapping[sexo]));
  const hue   = base.h;

  const start = hsl(hue,0.3,0.8).toString();
  const end   = hsl(hue,0.8,0.2).toString();


  // 3) monte a escala HCL com três pontos: mínimo, base e máximo
  return d3.scaleLinear<string>()
    .domain([min, max])
    .range([start, end])
    .interpolate(d3.interpolateHsl);
}

export const getStrokeColor: Record<string,string> = {
  'Fem':   '#fff',
  'Masc':  '#fff',
  'Todos': '#fff'
  
}

// Labels de estados nutricionais
export const estadoLabel: Record<string, string> = {
  baixo_peso:        "Baixo Peso",
  eutrofico:         "Eutrófico",
  sobrepeso:         "Sobrepeso",
  obesidade_G_1:     "Obesidade Grau I",
  obesidade_G_2:     "Obesidade Grau II",
  obesidade_G_3:     "Obesidade Grau III",
  magreza_acentuada: "Magreza Acentuada",
  magreza:           "Magreza",
  obesidade:         "Obesidade",
  obesidade_grave:   "Obesidade Grave",
};

// Objetos de configuração / lookup
export const conflicts: Record<"excesso_peso" | "obesidade_calc", string[]> = {
  excesso_peso:   ["sobrepeso","obesidade_G_1","obesidade_G_2","obesidade_G_3","obesidade_calc"],
  obesidade_calc: ["obesidade_G_1","obesidade_G_2","obesidade_G_3","excesso_peso"]
};

// Nomes amigáveis dos indicadores
export const nomeAmigavel: Record<string, string> = {
  altura_muito_baixa_para_a_idade: "Altura muito baixa para idade",
  altura_baixa_para_a_idade:      "Altura baixa para idade",
  altura_adequada_para_a_idade:    "Altura adequada para idade",
  magreza_acentuada:               "Magreza Acentuada",
  magreza:                         "Magreza",
  obesidade:                       "Obesidade",
  obesidade_grave:                 "Obesidade Grave",
  baixo_peso:                      "Baixo Peso",
  eutrofico:                       "Eutrófico",
  sobrepeso:                       "Sobrepeso",
  obesidade_G_1:                   "Obesidade I",
  obesidade_G_2:                   "Obesidade II",
  obesidade_G_3:                   "Obesidade III",
  obesidade_calc:                  "Obesidade",
  excesso_peso:                    "Excesso de Peso",
};

// Labels de Unidades Federativas
export const ufLabel: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AM: "Amazonas", AP: "Amapá", BA: "Bahia",
  CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul",
  RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo",
  SE: "Sergipe", TO: "Tocantins", Brasil: "Brasil",
};

// Labels de sexo
export const sexoLabel: Record<string, string> = {
  Fem: "Femininos",
  Masc: "Masculinos",
  Todos: "Todos",
};

// Labels de fases da vida
export const faseLabel: Record<string, string> = {
  adulto:      "Adultos",
  adolescente: "Adolescentes",
};

// Mapas de GeoJSON para municípios e regiões de saúde
export const stateGeojsonFiles: Record<string, string> = {
  "AC": "data/geojson/br_cities/geojs-12-mun.json",
  "AM": "data/geojson/br_cities/geojs-13-mun.json",
  "AP": "data/geojson/br_cities/geojs-16-mun.json",
  "PA": "data/geojson/br_cities/geojs-15-mun.json",
  "RO": "data/geojson/br_cities/geojs-11-mun.json",
  "RR": "data/geojson/br_cities/geojs-14-mun.json",
  "TO": "data/geojson/br_cities/geojs-17-mun.json",
  "AL": "data/geojson/br_cities/geojs-27-mun.json",
  "BA": "data/geojson/br_cities/geojs-29-mun.json",
  "CE": "data/geojson/br_cities/geojs-23-mun.json",
  "MA": "data/geojson/br_cities/geojs-21-mun.json",
  "PB": "data/geojson/br_cities/geojs-25-mun.json",
  "PE": "data/geojson/br_cities/geojs-26-mun.json",
  "PI": "data/geojson/br_cities/geojs-22-mun.json",
  "RN": "data/geojson/br_cities/geojs-24-mun.json",
  "SE": "data/geojson/br_cities/geojs-28-mun.json",
  "ES": "data/geojson/br_cities/geojs-32-mun.json",
  "MG": "data/geojson/br_cities/geojs-31-mun.json",
  "RJ": "data/geojson/br_cities/geojs-33-mun.json",
  "SP": "data/geojson/br_cities/geojs-35-mun.json",
  "PR": "data/geojson/br_cities/geojs-41-mun.json",
  "RS": "data/geojson/br_cities/geojs-43-mun.json",
  "SC": "data/geojson/br_cities/geojs-42-mun.json",
  "DF": "data/geojson/br_cities/geojs-53-mun.json",
  "GO": "data/geojson/br_cities/geojs-52-mun.json",
  "MT": "data/geojson/br_cities/geojs-51-mun.json",
  "MS": "data/geojson/br_cities/geojs-50-mun.json"
};

// Arquivos GeoJSON para municípios
export const stateRGeojsonFiles: Record<string, string> = {
  "AC": "data/geojson/by_state/health_regions_12.geojson",
  "AM": "data/geojson/by_state/health_regions_13.geojson",
  "AP": "data/geojson/by_state/health_regions_16.geojson",
  "PA": "data/geojson/by_state/health_regions_15.geojson",
  "RO": "data/geojson/by_state/health_regions_11.geojson",
  "RR": "data/geojson/by_state/health_regions_14.geojson",
  "TO": "data/geojson/by_state/health_regions_17.geojson",
  "AL": "data/geojson/by_state/health_regions_27.geojson",
  "BA": "data/geojson/by_state/health_regions_29.geojson",
  "CE": "data/geojson/by_state/health_regions_23.geojson",
  "MA": "data/geojson/by_state/health_regions_21.geojson",
  "PB": "data/geojson/by_state/health_regions_25.geojson",
  "PE": "data/geojson/by_state/health_regions_26.geojson",
  "PI": "data/geojson/by_state/health_regions_22.geojson",
  "RN": "data/geojson/by_state/health_regions_24.geojson",
  "SE": "data/geojson/by_state/health_regions_28.geojson",
  "ES": "data/geojson/by_state/health_regions_32.geojson",
  "MG": "data/geojson/by_state/health_regions_31.geojson",
  "RJ": "data/geojson/by_state/health_regions_33.geojson",
  "SP": "data/geojson/by_state/health_regions_35.geojson",
  "PR": "data/geojson/by_state/health_regions_41.geojson",
  "RS": "data/geojson/by_state/health_regions_43.geojson",
  "SC": "data/geojson/by_state/health_regions_42.geojson",
  "DF": "data/geojson/by_state/health_regions_53.geojson",
  "GO": "data/geojson/by_state/health_regions_52.geojson",
  "MT": "data/geojson/by_state/health_regions_51.geojson",
  "MS": "data/geojson/by_state/health_regions_50.geojson"
};

// Labels de indicadores por fase
export const nomesIndicadoresAdulto: Record<string, string> = {
  baixo_peso:    "Baixo Peso",
  eutrofico:     "Eutrófico",
  sobrepeso:     "Sobrepeso",
  obesidade_G_1: "Obesidade Grau I",
  obesidade_G_2: "Obesidade Grau II",
  obesidade_G_3: "Obesidade Grau III"
};

export const nomesIndicadoresAdolescente: Record<string, string> = {
  magreza_acentuada: "Magreza Acentuada",
  magreza:           "Magreza",
  obesidade:         "Obesidade",
  obesidade_grave:   "Obesidade Grave"
};

export const filtroNutricionalFase: Record<string, Array<string>> = {
  "adulto": [
    "baixo_peso",
    "eutrofico",
    "sobrepeso",
    "obesidade_G_1",
    "obesidade_G_2",
    "obesidade_G_3"
  ],
  "adolescente": [
    "magreza_acentuada",
    "magreza",
    "obesidade",
    "obesidade_grave"
  ]
}


/**
 * Exibe o tooltip no posicionamento do cursor
 */
export function showTooltip(htmlContent: string, event: MouseEvent): void {
  const tooltip = d3.select<HTMLDivElement, unknown>("#regional-tooltip");
  tooltip
    .html(htmlContent)
    .classed("hidden", false)
    .classed("opacity-0", false)
    .classed("opacity-100", true)
    .style("left",  (event.clientX + 10) + "px")
    .style("top",   (event.clientY + 10) + "px");
}

/**
 * Move o tooltip conforme o cursor
 */
export function moveTooltip(event: MouseEvent): void {
  const tooltip = d3.select<HTMLDivElement, unknown>("#regional-tooltip");
  tooltip
    .style("left", (event.clientX + 10) + "px")
    .style("top",  (event.clientY + 10) + "px");
}

/**
 * Esconde o tooltip
 */
export function hideTooltip(): void {
  const tooltip = d3.select<HTMLDivElement, unknown>("#regional-tooltip");
  tooltip
    .classed("opacity-100", false)
    .classed("opacity-0", true)
    .classed("hidden", true);
}

const cidadesFriendly: Record< string, Record< string, string > > = {};

// Carrega nomes amigáveis das cidades de cada UF
export function preloadCidadesFriendly(): Promise<void[]> {
  const promises = Object.entries(stateGeojsonFiles).map(([uf, path]) => json<FeatureCollection>(path).then(geoData => {
    cidadesFriendly[uf] = {};
    geoData.features.forEach(feature => {
      const id = feature.properties.id || feature.properties.CODMUN || feature.properties.cod_mun;
      const nome = feature.properties.name || feature.properties.NOME;
      if (id && nome) {
        cidadesFriendly[uf][String(id)] = nome;
      
    }
  });
  })
  );
  return Promise.all(promises);
}

export function legendasMapa(
        mapContainer: HTMLElement,
        colorScale: Function,
        minVal: number,
        maxVal: number      ) : void 
  {

      const legendSel = d3.select(mapContainer.parentElement!).select<HTMLElement>('.legendRegional');
      d3.select('.legendRegional').selectAll("*").remove();
      const legendWidth    = 20;
      const legendHeight   = 200;
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
//============== Filtros Cidade/Região de Saúde ===========================
// 1) Declare o tipo de cada linha de dados que chega do CSV
export interface DataRow {
  // campos fixos que você usa:
  UF: string
  codigo_municipio: string
  municipio: string
  ANO: string
  fase_vida: string
  SEXO: string
  total: string

  // colunas numéricas que você soma
  baixo_peso: number
  eutrofico: number
  sobrepeso: number
  obesidade_G_1: number
  obesidade_G_2: number
  obesidade_G_3: number

  magreza_acentuada: number
  magreza: number
  obesidade: number
  obesidade_grave: number

  // permite acessar qualquer coluna pelo nome dinâmico
  [key: string]: string | number
}
// Tipagem para as linhas do CSV de regiões
export interface RegionDataRow {
  municipio_id_sdv: string;
  regional_id: string;
  uf: string;
  nome_regiao: string;
}

export function FiltroChangerMunReg(
  selectModo:HTMLSelectElement,
  labelModo: HTMLLabelElement,
  selectUF:HTMLSelectElement,
  selectMunicipio: HTMLSelectElement,
  labelMunicipio: HTMLLabelElement,
  data: DataRow[],
  dataRegion: RegionDataRow[],
) : void {
  const regionPorUF: Record<string, Map<string, string>> = {};

  [labelMunicipio,selectMunicipio,labelModo,selectModo].forEach(muni => { 
      muni.classList.toggle("hidden", selectUF.value === "" );
    });

  //Atualiza lista de Regiões conforme UF
  function atualizarRegioes(
      ufSelecionada: string, 
      selectMunicipioEl: HTMLSelectElement,
      dataRegion: RegionDataRow[]): void{
    
    
    if (!regionPorUF[ufSelecionada]){
      regionPorUF[ufSelecionada] = new Map();
      dataRegion
        .filter(d => d.uf === ufSelecionada)
        .forEach(d => {
          regionPorUF[ufSelecionada]!.set(d.regional_id, d.nome_regiao);
        })
    }
    const RegMap = regionPorUF[ufSelecionada];
    selectMunicipio.innerHTML = "";
    console.log("→ Construindo mapa para UF", ufSelecionada, ":",
            Array.from(RegMap?.entries()||[]));
    Array.from(RegMap!.entries())
      .sort((a,b) => a[1].localeCompare(b[1]))
      .forEach(([code,name]) => {
        const o = document.createElement("option");
        o.value = code;
        o.text =  name;
        selectMunicipioEl.appendChild(o);
      });

  }
  function atualizarMunicipios(
          ufSelecionada: string,
          selectMunicipioEl: HTMLSelectElement,
          data: DataRow[]
        ): void {
          // se nenhuma UF selecionada, mostra apenas “Todos”
          if (!ufSelecionada) {
            selectMunicipioEl.innerHTML = "<option value=''>Todos</option>";
            return;
          }
  
          // filtra os municípios daquela UF
          const linhaUF = data.filter(d => d.UF === ufSelecionada);
          const mapMunicipios = new Map<string, string>();
          linhaUF.forEach(d=>{
            mapMunicipios.set(d.codigo_municipio,d.municipio);
          });
          const municipios: Array<{code:string;name:string}> = Array.from(mapMunicipios.entries()).map(([code,name])=>({ code, name}));
          municipios.sort((a,b)=>a.name.localeCompare(b.name));
  
          // esvazia e preenche
          selectMunicipioEl.innerHTML = "<option value=''>Todos</option>";
          municipios.forEach((m) => {
            const label = cidadesFriendly[ufSelecionada][m.code] || m.name;
            const opt = document.createElement("option");
            opt.value = m.code;
            opt.text = label;
            selectMunicipioEl.appendChild(opt);
          });
          
        }

  if (selectModo.value === "federativa"){
    return atualizarMunicipios(selectUF.value, selectMunicipio, data);
  } else {
    return atualizarRegioes(selectUF.value, selectMunicipio, dataRegion);
  }
};



export { cidadesFriendly };