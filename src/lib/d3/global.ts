import * as d3 from "d3";
import type { FeatureCollection } from "geojson";
import { json } from "d3-fetch";
import {hsl} from "d3-color";

// Tamanhos do SVG
export const width  = 800;
export const height = 520;

//=============== Função para resize dos gráficos ===================//
export function debounce<F extends (...args: any[]) => void>(fn: F, delay: number = 120) {
  let timer: number | undefined;
  return (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const REGIONAL_RESIZE_PROP = "resizeRegional";
export const TEMPORAL_RESIZE_PROP = "__resizeTemporal";
//====================================================================//


export function getChartSize(
  container: HTMLElement,
  opts: { minWidth?: number;minHeight?: number } = {}
): { width: number; height: number }{  

  const { minWidth = 600, minHeight = 350} = opts;

  const rect      = (container as HTMLElement).getBoundingClientRect();
  const style = getComputedStyle(container as HTMLElement);
  const padTop = parseFloat(style.paddingTop) || 0;
  const padBottom = parseFloat(style.paddingBottom) || 0;
  const padLeft = parseFloat(style.paddingLeft) || 0;
  const padRight = parseFloat(style.paddingRight) || 0;

  const availableWidth  = rect.width - padLeft - padRight || width  ;
  const availableHeight = rect.height - padTop - padBottom || height ;

  return {
    width:  Math.max( Math.min( availableWidth,  minWidth  ), availableWidth ),
    height: Math.max( Math.min( availableHeight, minHeight ), availableHeight)
  };
}

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

export const cores = {Todos: 'primary', Fem: 'secondary', Masc: 'accent'};

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
  excesso_peso:      "Excesso de Peso",
  obesidade_calc:    "Obesidade"
};

// Objetos de configuração / lookup
export const conflicts: Record<"excesso_peso" | "obesidade_calc", string[]> = {
  excesso_peso:   ["sobrepeso","obesidade_G_1","obesidade_G_2","obesidade_G_3"],
  obesidade_calc: ["obesidade_G_1","obesidade_G_2","obesidade_G_3"]
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

export const nomeMacrorregion = {
  "1101": "Macrorregião II (Cacoal)",
  "1102": "Macrorregião I - Porto Velho",
  "1201": "Macro Única - AC",
  "1302": "Oeste",
  "1303": "Leste",
  "1304": "Central",
  "1401": "Macro-Roraima",
  "1509": "Macrorregião IV",
  "1510": "Macrorregião III",
  "1511": "Macrorregião II",
  "1512": "Macrorregião I",
  "1601": "Macro Única - AP",
  "1701": "Macrorregião de Saúde Norte",
  "1702": "Macrorregião Centro-Sul",
  "2109": "Macrorregião Sul",
  "2110": "Macrorregião Norte",
  "2111": "Macrorregião Leste",
  "2207": "Semi-Arido",
  "2208": "Meio Norte",
  "2209": "Litoral",
  "2210": "Cerrados",
  "2306": "Litoral Leste Jaguaribe",
  "2307": "Sertão Central",
  "2308": "Cariri",
  "2309": "Sobral",
  "2310": "Fortaleza",
  "2401": "Macrorregião II",
  "2402": "Macrorregião I",
  "2501": "Macrorregião III - Sertão Alto Sertão",
  "2502": "Macrorregião II - Campina Grande",
  "2503": "Macrorregião I - João Pessoa",
  "2605": "Vale do S.francisco e Araripe",
  "2606": "Sertão",
  "2607": "Metropolitana",
  "2608": "Agreste",
  "2703": "2a Macrorregião de Saúde",
  "2704": "1a Macrorregião de Saúde",
  "2801": "Macro Única",
  "2910": "Sul (Nbs - Ilheus)",
  "2911": "Sudoeste (Nbs - Vitoria Conquista)",
  "2912": "Oeste (Nbs - Barreiras)",
  "2913": "Norte - (Nrs - Juazeiro)",
  "2914": "Nordeste (Nrs - Alagoinhas)",
  "2915": "Leste - (Nrs - Salvador)",
  "2916": "Extremo Sul (Nrs - Teixeira Freitas)",
  "2917": "Centro-Leste (Nrs - Feira Santana)",
  "2918": "Centro - Norte (Nrs - Jacobina)",
  "3101": "Sul",
  "3102": "Centro Sul",
  "3103": "Centro",
  "3104": "Jequitinhonha",
  "3105": "Oeste",
  "3106": "Leste",
  "3107": "Sudeste",
  "3108": "Norte",
  "3109": "Noroeste",
  "3110": "Leste do Sul",
  "3111": "Nordeste",
  "3112": "Triangulo do Sul",
  "3113": "Triangulo do Norte",
  "3114": "Vale do Aco",
  "3115": "Extremo Sul",
  "3116": "Sudoeste",
  "3205": "Sul",
  "3207": "Metropolitana",
  "3209": "Central Norte",
  "3312": "Macrorregião I",
  "3518": "Rras9",
  "3519": "Rras8",
  "3520": "Rras7",
  "3521": "Rras6",
  "3522": "Rras5",
  "3523": "Rras4",
  "3524": "Rras3",
  "3525": "Rras2",
  "3526": "Rras17",
  "3527": "Rras16",
  "3528": "Rras15",
  "3529": "Rras14",
  "3530": "Rras13",
  "3531": "Rras12",
  "3532": "Rras11",
  "3533": "Rras10",
  "3534": "Rras1",
  "3535": "Rras18",
  "3536": "Rras19",
  "4105": "Macrorregião Norte",
  "4106": "Macrorregião Noroeste",
  "4107": "Macrorregião Leste",
  "4108": "Macrorregião Oeste",
  "4210": "Sul",
  "4211": "Planalto Norte e Nordeste",
  "4213": "Grande Oeste",
  "4214": "Grande Florianopolis",
  "4215": "Foz do Rio Itajai",
  "4216": "Vale do Itajai",
  "4217": "Meio Oeste",
  "4218": "Serra Catarinense",
  "4308": "Vales",
  "4309": "Sul",
  "4310": "Serra",
  "4311": "Norte",
  "4312": "Missioneira",
  "4313": "Metropolitana",
  "4314": "Centro-Oeste",
  "5009": "Pantanal",
  "5010": "Centro",
  "5011": "Cone Sul",
  "5012": "Costa Leste",
  "5101": "Macrorregião Sul",
  "5102": "Macrorregião Oeste",
  "5103": "Macrorregião Norte",
  "5104": "Macrorregião Leste",
  "5105": "Macrorregião Centro-Norte",
  "5106": "Macrorregião Centro-Noroeste",
  "5206": "Macrorregião Sudoeste",
  "5207": "Macrorregião Nordeste",
  "5208": "Macrorregião Centro-Oeste",
  "5209": "Macrorregião Centro-Norte",
  "5210": "Macrorregião Centro Sudeste",
  "5302": "Distrito Federal"
}

export const nomeRegion = {
  "11003": "Central",
  "11006": "Cone Sul",
  "11002": "Café",
  "11005": "Zona da Mata",
  "11007": "Vale do Guaporé",
  "11004": "Madeira-Mamoré",
  "11001": "Vale do Jamari",
  "12002": "Baixo Acre e Purus",
  "12003": "Juruá e Tarauacá Envira",
  "12001": "Alto Acre",
  "13008": "Triangulo",
  "13009": "Alto Solimoes",
  "13007": "Regional Juruá",
  "13004": "Medio Amazonas",
  "13005": "Baixo Amazonas",
  "13003": "Rio Madeira",
  "13001": "Manaus, Entorno e Alto Rio Negro",
  "13002": "Rio Negro e Solimoes",
  "13006": "Regional Purus",
  "14001": "Centro Norte",
  "14002": "Sul",
  "15003": "Carajas",
  "15004": "Lago de Tucurui",
  "15001": "Araguaia",
  "15002": "Baixo Amazonas",
  "15012": "Xingu",
  "15010": "Tapajos",
  "15008": "Metropolitana III",
  "15009": "Rio Caetes",
  "15007": "Metropolitana II",
  "15006": "Metropolitana I",
  "15011": "Tocantins",
  "15014": "Marajo II",
  "15013": "Marajo I",
  "16001": "Area Central",
  "16003": "Area Sudoeste",
  "16002": "Area Norte",
  "17001": "Medio Norte Araguaia",
  "17004": "Cerrado Tocantins Araguaia",
  "17002": "Bico do Papagaio",
  "17006": "Capim Dourado",
  "17005": "Ilha do Bananal",
  "17008": "Amor Perfeito",
  "17007": "Cantao",
  "17003": "Sudeste",
  "21008": "Imperatriz",
  "21001": "Acailandia",
  "21003": "Balsas",
  "21004": "Barra do Corda",
  "21016": "São Luis",
  "21002": "Bacabal",
  "21014": "Santa Ines",
  "21011": "Pinheiro",
  "21006": "Chapadinha",
  "21013": "Rosario",
  "21009": "Itapecuru Mirim",
  "21018": "Viana",
  "21019": "Ze Doca",
  "21017": "Timon",
  "21005": "Caxias",
  "21007": "Codo",
  "21012": "Presidente Dutra",
  "21010": "Pedreiras",
  "21015": "São João dos Patos",
  "22009": "Vale do Rio Guaribas",
  "22008": "Vale do Caninde",
  "22010": "Vale do Sambito",
  "22012": "Chapada Vale do Rio Itaim",
  "22004": "Entre Rios",
  "22001": "Carnaubais",
  "22005": "Planicie Litoranea",
  "22003": "Cocais",
  "22011": "Vale dos Rios Piaui e Itaueiras",
  "22006": "Serra da Capivara",
  "22002": "Chapada das Mangabeiras",
  "22007": "Tabuleiros do Alto Parnaiba",
  "23025": "4a RS Litoral Leste Jaguaribe",
  "23024": "3a RS Sertão Central",
  "23023": "2a RS Cariri",
  "23011": "5a RS Sobral",
  "23001": "1a RS Fortaleza",
  "24002": "2a Região de Saúde - Mossoro",
  "24008": "8a Região de Saúde - Acu",
  "24006": "6a Região de Saúde - Pau dos Ferros",
  "24007": "7a Região de Saúde - Metropolitana",
  "24003": "3a Região de Saúde - João Camara",
  "24004": "4a Região de Saúde - Caico",
  "24001": "1a Região de Saúde - São Jose de Mipibu",
  "24005": "5a Região de Saúde - Santa Cruz",
  "25006": "6a Região",
  "25010": "10a Região",
  "25009": "9a Região",
  "25013": "13a Região",
  "25008": "8a Região",
  "25007": "7a Região",
  "25011": "11a Região",
  "25016": "16a Região",
  "25015": "15a Região",
  "25005": "5a Região",
  "25003": "3a Região",
  "25004": "4a Região",
  "25001": "1a Região Mata Atlantica",
  "25002": "2a Região",
  "25014": "14a Região",
  "25012": "12a Região",
  "26009": "VIII Região de Saúde",
  "26007": "IX Região de Saúde",
  "26011": "VII Região de Saúde",
  "26012": "XI Região de Saúde",
  "26002": "VI Região de Saúde",
  "26001": "X Região de Saúde",
  "26010": "I Região de Saúde",
  "26005": "XII Região de Saúde",
  "26006": "II Região de Saúde",
  "26008": "III Região de Saúde",
  "26003": "IV Região de Saúde",
  "26004": "V Região de Saúde",
  "27007": "7a Região de Saúde",
  "27008": "8a Região de Saúde",
  "27010": "10a Região de Saúde",
  "27009": "9a Região de Saúde",
  "27001": "1a Região de Saúde",
  "27003": "3a Região de Saúde",
  "27006": "6a Região de Saúde",
  "27005": "5a Região de Saúde",
  "27004": "4a Região de Saúde",
  "27002": "2a Região de Saúde",
  "28001": "Aracaju",
  "28006": "Nossa Senhora do Socorro",
  "28003": "Itabaiana",
  "28004": "Lagarto",
  "28002": "Estancia",
  "28005": "Nossa Senhora da Gloria",
  "28007": "Propria",
  "29012": "Itabuna",
  "29009": "Ilheus",
  "29015": "Jequie",
  "29027": "Valenca",
  "29028": "Vitoria da Conquista",
  "29007": "Guanambi",
  "29003": "Brumado",
  "29013": "Itapetinga",
  "29002": "Barreiras",
  "29021": "Santa Maria da Vitoria",
  "29008": "Ibotirama",
  "29016": "Juazeiro",
  "29017": "Paulo Afonso",
  "29024": "Senhor do Bonfim",
  "29001": "Alagoinhas",
  "29019": "Ribeira do Pombal",
  "29020": "Salvador",
  "29004": "Camacari",
  "29022": "Santo Antonio de Jesus",
  "29005": "Cruz das Almas",
  "29018": "Porto Seguro",
  "29026": "Teixeira de Freitas",
  "29006": "Feira de Santana",
  "29025": "Serrinha",
  "29011": "Itaberaba",
  "29023": "Seabra",
  "29014": "Jacobina",
  "29010": "Irece",
  "31012": "Varginha",
  "31004": "Lavras",
  "31010": "Tres Coracoes",
  "31011": "Tres Pontas",
  "31008": "São Lourenco",
  "31079": "Conselheiro Lafaiete",
  "31013": "Barbacena",
  "31015": "São João Del Rei",
  "31078": "Congonhas",
  "31016": "Belo Horizonte Nova Lima Santa Luzia",
  "31018": "Contagem",
  "31017": "Betim",
  "31024": "Sete Lagoas",
  "31025": "Vespasiano Lagoa Santa",
  "31021": "Itabira",
  "31019": "Curvelo",
  "31023": "João Monlevade",
  "31022": "Ouro Preto",
  "31020": "Guanhaes",
  "31026": "Diamantina Itamarandiba",
  "31027": "Turmalina Minas Novas Capelinha",
  "31064": "Aracuai",
  "31095": "Serro",
  "31086": "Divinopolis",
  "31032": "Pará de Minas Nova Serrana",
  "31031": "Itauna",
  "31030": "Formiga",
  "31089": "Campo Belo",
  "31028": "Bom Despacho",
  "31087": "Lagoa da Prata Santo Antonio do Monte",
  "31088": "Oliveira Santo Antonio do Amparo",
  "31036": "Governador Valadares",
  "31038": "Mantena",
  "31040": "Resplendor",
  "31102": "Pecanha São João Evangelista Santa Maria do Suacui",
  "31097": "Juiz de Fora",
  "31045": "Muriae",
  "31048": "Uba",
  "31044": "Leopoldina Cataguases",
  "31046": "Santos Dumont",
  "31042": "Carangola",
  "31041": "Alem Paraíba",
  "31047": "São João Nepomuceno Bicas",
  "31090": "Lima Duarte",
  "31084": "Montes Claros",
  "31052": "Janauba Monte Azul",
  "31053": "Januaria",
  "31055": "Pirapora",
  "31100": "São Francisco",
  "31083": "Bocaiuva",
  "31098": "Salinas",
  "31085": "Taiobeiras",
  "31101": "Brasilia de Minas",
  "31050": "Coracao de Jesus",
  "31051": "Francisco Sa",
  "31076": "Manga",
  "31057": "Patos de Minas",
  "31058": "Unai Paracatu",
  "31077": "João Pinheiro",
  "31082": "São Gotardo",
  "31059": "Manhuacu",
  "31061": "Vicosa",
  "31060": "Ponte Nova",
  "31099": "Teofilo Otoni Malacacheta",
  "31094": "Almenara Jacinto",
  "31066": "Nanuque",
  "31068": "Pedra Azul",
  "31096": "Itambacuri",
  "31065": "Itaobim",
  "31067": "Padre Paraiso",
  "31062": "Aguas Formosas",
  "31072": "Uberaba",
  "31070": "Araxa",
  "31071": "Frutal Iturama",
  "31075": "Uberlandia Araguari",
  "31073": "Ituiutaba",
  "31074": "Patrocinio Monte Carmelo",
  "31037": "Ipatinga",
  "31035": "Coronel Fabriciano Timoteo",
  "31034": "Caratinga",
  "31006": "Pocos de Caldas",
  "31007": "Pouso Alegre",
  "31003": "Itajuba",
  "31092": "Passos",
  "31001": "Alfenas Machado",
  "31009": "São Sebastiao do Paraiso",
  "31002": "Guaxupe",
  "31093": "Piumhi",
  "31091": "Cassia",
  "32004": "Sul",
  "32002": "Metropolitana",
  "32001": "Central",
  "32003": "Norte",
  "33005": "Metropolitana I",
  "33006": "Metropolitana II",
  "33008": "Norte",
  "33009": "Serrana",
  "33004": "Medio Paraíba",
  "33002": "Baixada Litoranea",
  "33001": "Baia da Ilha Grande",
  "33007": "Noroeste",
  "33003": "Centro-Sul",
  "35062": "Bauru",
  "35063": "Polo Cuesta",
  "35064": "Jau",
  "35061": "Vale do Jurumirim",
  "35065": "Lins",
  "35163": "Sorocaba",
  "35161": "Itapetininga",
  "35162": "Itapeva",
  "35041": "Baixada Santista",
  "35121": "Vale do Ribeira",
  "35016": "São Paulo",
  "35014": "Rota dos Bandeirantes",
  "35013": "Mananciais",
  "35012": "Franco da Rocha",
  "35011": "Alto do Tiete",
  "35171": "Alto Vale do Paraíba",
  "35174": "Vale do Paraíba Região Serrana",
  "35173": "Litoral Norte",
  "35172": "Circuito da Fe e Vale Historico",
  "35073": "Jundiai",
  "35071": "Braganca",
  "35072": "Região Metropolitana de Campinas",
  "35141": "Baixa Mogiana",
  "35142": "Mantiqueira",
  "35074": "Circuito das Aguas",
  "35143": "Rio Pardo",
  "35103": "Piracicaba",
  "35102": "Limeira",
  "35104": "Rio Claro",
  "35101": "Araras",
  "35132": "Aquifero Guarani",
  "35081": "Tres Colinas",
  "35131": "Horizonte Verde",
  "35051": "Norte - Barretos",
  "35052": "Sul - Barretos",
  "35133": "Vale das Cachoeiras",
  "35082": "Alta Anhanguera",
  "35083": "Alta Mogiana",
  "35155": "São Jose do Rio Preto",
  "35151": "Catanduva",
  "35157": "Votuporanga",
  "35154": "Fernandopolis",
  "35153": "Jales",
  "35156": "Jose Bonifacio",
  "35152": "Santa Fe do Sul",
  "35112": "Alta Sorocabana",
  "35111": "Alta Paulista",
  "35114": "Extremo Oeste Paulista",
  "35113": "Alto Capivari",
  "35115": "Pontal do Paranapanema",
  "35093": "Marilia",
  "35094": "Ourinhos",
  "35092": "Assis",
  "35095": "Tupa",
  "35091": "Adamantina",
  "35015": "Grande Abc",
  "35032": "Coracao do Drs III",
  "35031": "Central do Drs III",
  "35033": "Noroeste do Drs III",
  "35021": "Central do Drs II",
  "35023": "Consorcios do Drs II",
  "35022": "Lagos do Drs II",
  "41017": "17a RS Londrina",
  "41016": "16a RS Apucarana",
  "41018": "18a RS Cornelio Procopio",
  "41019": "19a RS Jacarezinho",
  "41022": "22a RS Ivaipora",
  "41015": "15a RS Maringa",
  "41012": "12a RS Umuarama",
  "41011": "11a RS Campo Mourao",
  "41014": "14a RS Paranavai",
  "41013": "13a RS Cianorte",
  "41002": "2a RS Metropolitana",
  "41003": "3a RS Ponta Grossa",
  "41005": "5a RS Guarapuava",
  "41001": "1a RS Paranagua",
  "41021": "21a RS Telemaco Borba",
  "41004": "4a RS Irati",
  "41006": "6a RS Uniao da Vitoria",
  "41010": "10a RS Cascavel",
  "41009": "9a RS Foz do Iguaçu",
  "41020": "20a RS Toledo",
  "41008": "8a RS Francisco Beltrao",
  "41007": "7a RS Pato Branco",
  "42015": "Carbonifera",
  "42016": "Laguna",
  "42014": "Extremo Sul Catarinense",
  "42011": "Nordeste",
  "42017": "Vale do Itapocu",
  "42012": "Planalto Norte",
  "42002": "Oeste",
  "42003": "Xanxere",
  "42001": "Extremo Oeste",
  "42007": "Grande Florianopolis",
  "42005": "Foz do Rio Itajai",
  "42006": "Medio Vale do Itajai",
  "42004": "Alto Vale do Itajai",
  "42010": "Alto Uruguai Catarinense",
  "42009": "Alto Vale do Rio do Peixe",
  "42008": "Meio Oeste",
  "42013": "Serra Catarinense",
  "43028": "Região 28",
  "43029": "Região 29",
  "43027": "Região 27",
  "43030": "Região 30",
  "43021": "Região 21",
  "43022": "Região 22",
  "43023": "Região 23",
  "43025": "Região 25",
  "43026": "Região 26",
  "43024": "Região 24",
  "43017": "Região 17 - Planalto",
  "43016": "Região 16",
  "43020": "Região 20 - Rota da Producao",
  "43015": "Região 15 - Caminho das Aguas",
  "43019": "Região 19",
  "43018": "Região 18",
  "43013": "Região 13",
  "43014": "Região 14",
  "43011": "Região 11",
  "43012": "Região 12",
  "43010": "Região 10",
  "43008": "Região 08",
  "43007": "Região 07",
  "43009": "Região 09",
  "43004": "Região 04",
  "43005": "Região 05",
  "43006": "Região 06 - Vale do Paranhana e Costa Serra",
  "43001": "Região 01",
  "43003": "Região 03",
  "43002": "Região 02",
  "50010": "Pantanal",
  "50011": "Centro",
  "50009": "Baixo Pantanal",
  "50015": "Norte",
  "50012": "Centro Sul",
  "50017": "Sul Fronteira",
  "50016": "Sudeste",
  "50013": "Leste",
  "50014": "Nordeste",
  "51013": "Sul Matogrossense",
  "51011": "Oeste Matogrossense",
  "51012": "Sudoeste Matogrossense",
  "51014": "Teles Pires",
  "51001": "Alto Tapajos",
  "51016": "Vale dos Arinos",
  "51015": "Vale do Peixoto",
  "51010": "Norte Matogrossense",
  "51005": "Garcas Araguaia",
  "51003": "Araguaia Xingu",
  "51006": "Medio Araguaia",
  "51009": "Norte Araguaia Karaja",
  "51002": "Baixada Cuiabana",
  "51007": "Medio Norte Matogrossense",
  "51008": "Noroeste Matogrossense",
  "51004": "Centro Norte",
  "52015": "Sudoeste I",
  "52016": "Sudoeste II",
  "52004": "Entorno Sul",
  "52003": "Entorno Norte",
  "52007": "Nordeste II",
  "52006": "Nordeste I",
  "52001": "Central",
  "52012": "Rio Vermelho",
  "52009": "Oeste I",
  "52010": "Oeste II",
  "52011": "Pirineus",
  "52018": "São Patricio II",
  "52008": "Norte",
  "52014": "Serra da Mesa",
  "52013": "São Patricio I",
  "52002": "Centro Sul",
  "52005": "Estrada de Ferro",
  "52017": "Sul",
  "53001": "Distrito Federal"
}


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

// Mapas de GeoJSON para municípios
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

// Arquivos GeoJSON para regiões de saúde
export const stateRGeojsonFiles: Record<string, string> = {
  "AC": "data/geojson/health_regions/geojs-12-health_regions.geojson",
  "AM": "data/geojson/health_regions/geojs-13-health_regions.geojson",
  "AP": "data/geojson/health_regions/geojs-16-health_regions.geojson",
  "PA": "data/geojson/health_regions/geojs-15-health_regions.geojson",
  "RO": "data/geojson/health_regions/geojs-11-health_regions.geojson",
  "RR": "data/geojson/health_regions/geojs-14-health_regions.geojson",
  "TO": "data/geojson/health_regions/geojs-17-health_regions.geojson",
  "AL": "data/geojson/health_regions/geojs-27-health_regions.geojson",
  "BA": "data/geojson/health_regions/geojs-29-health_regions.geojson",
  "CE": "data/geojson/health_regions/geojs-23-health_regions.geojson",
  "MA": "data/geojson/health_regions/geojs-21-health_regions.geojson",
  "PB": "data/geojson/health_regions/geojs-25-health_regions.geojson",
  "PE": "data/geojson/health_regions/geojs-26-health_regions.geojson",
  "PI": "data/geojson/health_regions/geojs-22-health_regions.geojson",
  "RN": "data/geojson/health_regions/geojs-24-health_regions.geojson",
  "SE": "data/geojson/health_regions/geojs-28-health_regions.geojson",
  "ES": "data/geojson/health_regions/geojs-32-health_regions.geojson",
  "MG": "data/geojson/health_regions/geojs-31-health_regions.geojson",
  "RJ": "data/geojson/health_regions/geojs-33-health_regions.geojson",
  "SP": "data/geojson/health_regions/geojs-35-health_regions.geojson",
  "PR": "data/geojson/health_regions/geojs-41-health_regions.geojson",
  "RS": "data/geojson/health_regions/geojs-43-health_regions.geojson",
  "SC": "data/geojson/health_regions/geojs-42-health_regions.geojson",
  "DF": "data/geojson/health_regions/geojs-53-health_regions.geojson",
  "GO": "data/geojson/health_regions/geojs-52-health_regions.geojson",
  "MT": "data/geojson/health_regions/geojs-51-health_regions.geojson",
  "MS": "data/geojson/health_regions/geojs-50-health_regions.geojson"
};

// Arquivos GeoJSON para regiões de saúde
export const stateMRGeojsonFiles: Record<string, string> = {
  "AC": "data/geojson/macro_regions/geojs-12-macro_regions.geojson",
  "AM": "data/geojson/macro_regions/geojs-13-macro_regions.geojson",
  "AP": "data/geojson/macro_regions/geojs-16-macro_regions.geojson",
  "PA": "data/geojson/macro_regions/geojs-15-macro_regions.geojson",
  "RO": "data/geojson/macro_regions/geojs-11-macro_regions.geojson",
  "RR": "data/geojson/macro_regions/geojs-14-macro_regions.geojson",
  "TO": "data/geojson/macro_regions/geojs-17-macro_regions.geojson",
  "AL": "data/geojson/macro_regions/geojs-27-macro_regions.geojson",
  "BA": "data/geojson/macro_regions/geojs-29-macro_regions.geojson",
  "CE": "data/geojson/macro_regions/geojs-23-macro_regions.geojson",
  "MA": "data/geojson/macro_regions/geojs-21-macro_regions.geojson",
  "PB": "data/geojson/macro_regions/geojs-25-macro_regions.geojson",
  "PE": "data/geojson/macro_regions/geojs-26-macro_regions.geojson",
  "PI": "data/geojson/macro_regions/geojs-22-macro_regions.geojson",
  "RN": "data/geojson/macro_regions/geojs-24-macro_regions.geojson",
  "SE": "data/geojson/macro_regions/geojs-28-macro_regions.geojson",
  "ES": "data/geojson/macro_regions/geojs-32-macro_regions.geojson",
  "MG": "data/geojson/macro_regions/geojs-31-macro_regions.geojson",
  "RJ": "data/geojson/macro_regions/geojs-33-macro_regions.geojson",
  "SP": "data/geojson/macro_regions/geojs-35-macro_regions.geojson",
  "PR": "data/geojson/macro_regions/geojs-41-macro_regions.geojson",
  "RS": "data/geojson/macro_regions/geojs-43-macro_regions.geojson",
  "SC": "data/geojson/macro_regions/geojs-42-macro_regions.geojson",
  "DF": "data/geojson/macro_regions/geojs-53-macro_regions.geojson",
  "GO": "data/geojson/macro_regions/geojs-52-macro_regions.geojson",
  "MT": "data/geojson/macro_regions/geojs-51-macro_regions.geojson",
  "MS": "data/geojson/macro_regions/geojs-50-macro_regions.geojson"
};

// Labels de indicadores por fase
export const nomesIndicadoresAdulto: Record<string, string> = {
  baixo_peso:    "Baixo Peso",
  eutrofico:     "Eutrófico",
  excesso_peso:  "Excesso de Peso",
  sobrepeso:     "Sobrepeso",
  obesidade_calc:"Obesidade",
  obesidade_G_1: "Obesidade Grau I",
  obesidade_G_2: "Obesidade Grau II",
  obesidade_G_3: "Obesidade Grau III"
};

export const filtroNutricionalFase: Record<string, Array<string>> = {
  "adulto": [
    "baixo_peso",
    "eutrofico",
    "excesso_peso",
    "sobrepeso",
    "obesidade_calc",
    "obesidade_G_1",
    "obesidade_G_2",
    "obesidade_G_3"
  ],
  "adolescente": [
    "eutrofico",
    "sobrepeso",
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

      // acha o wrapper que contém tanto o mapa quanto a legenda; sobe um nível se necessário
      let legendParent: HTMLElement | null = mapContainer.parentElement;
      if (legendParent && !legendParent.querySelector('.legendRegional') && legendParent.parentElement) {
        legendParent = legendParent.parentElement;
      }
      if (!legendParent) return; // segurança

      const legendSel = d3.select(legendParent).select<HTMLElement>('.legendRegional');
      if (legendSel.empty()) {
        // se ainda não achou, tenta buscar de forma global como fallback (para compatibilidade)
        console.warn("Não encontrou .legendRegional localmente; usando fallback global.");
        d3.select('.legendRegional').selectAll("*").remove();
      } else {
        // limpar apenas o escopo correto
        legendSel.selectAll("*").remove();
      }

      const legendWidth    = 20;
      const legendHeight   = 200;
      const legendSvg = legendSel.append("svg")
         .attr("width", 150)
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
         .attr("x",30).attr("y",10)
         .attr("width",legendWidth)
         .attr("height",legendHeight)
         .style("fill","url(#legend-gradient)");
      const legendScale = d3.scaleLinear()
         .domain([minVal, maxVal])
         .range([legendHeight, 0]);

      // eixo direito tip-safe
      const legendAxis = d3.axisRight(legendScale)
      .ticks(4)
      .tickFormat((d: number, i: number):string => {
        if (maxVal - minVal <= 3){
          return `${d.toFixed(1)}%`;
        }else{
        return `${d.toFixed(0)}%`;
        }
      });
      

      // adiciona o <g> para o eixo e chama o legendAxis diretamente
      const gLegend = legendSvg.append("g")
         .attr("transform", `translate(${legendWidth + 35}, 10)`);

      // aqui você *invoca* o gerador como função, não via .call() do D3
      gLegend.call(legendAxis);

      // rótulo rotacionado
      legendSvg
      .append("text")
         .attr("transform", `translate(${legendWidth+5}, ${10 + legendHeight/2}) rotate(-90)`)
         .attr("text-anchor", "middle")
         .attr("font-size", "18px")
         .style("font-weight", "500")
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
  SEXO: string
  total: string

  // colunas numéricas que você soma
  baixo_peso: number
  eutrofico: number
  sobrepeso: number
  obesidade_G_1: number
  obesidade_G_2: number
  obesidade_G_3: number

  // permite acessar qualquer coluna pelo nome dinâmico
  [key: string]: string | number
}
// Tipagem para as linhas do CSV de regiões
export interface RegionDataRow {
  municipio_id_sdv: string;
  macro_id: string;
  macro_nome: string;
  regional_id: string;
  uf: string;
  nome_regiao: string;
}

export function somarColunaCustom(
    arr: DataRow[],
    col: keyof DataRow
  ): number {
    if (col === "excesso_peso") {
      // soma sobrepeso + todos os obesidade_G_*
      return (
        d3.sum(arr, x =>
          x.sobrepeso
          + x.obesidade_G_1
          + x.obesidade_G_2
          + x.obesidade_G_3
        ) ?? 0
      )
    } else if (col === "obesidade_calc") {
      // soma apenas obesidade_G_1 + G_2 + G_3
      return (
        d3.sum(arr, x =>
          x.obesidade_G_1
          + x.obesidade_G_2
          + x.obesidade_G_3
        ) ?? 0
      )
    } else {
      // qualquer outra coluna — garantimos que seja número
      return (
        d3.sum(arr, x => {
          const v = x[col]
          return typeof v === "number" ? v : +v
        }) ?? 0
      )
    }
  }

// mapeamento de valores para G.somarColunaCustom
export function mapNutricional(nutri: string): keyof DataRow {
   if (nutri === "obesidade") return "obesidade_calc" as keyof DataRow;
   return nutri as keyof DataRow;
  }

export function denominadorLinha(d: DataRow): number {
   return (
    (+d.baixo_peso || 0) +
    (+d.eutrofico || 0) +
    (+d.sobrepeso || 0) +
    (+d.obesidade_G_1 || 0) +
    (+d.obesidade_G_2 || 0) +
    (+d.obesidade_G_3 || 0)
  );
  }

export function denominadorSoma(arr: DataRow[]): number {
   return d3.sum(arr,denominadorLinha);
  }
  
export function agregarNutri(arr: DataRow[], col: keyof DataRow, sexo?: "Fem" | "Masc") {
      const base = sexo ? arr.filter(d => d.SEXO === sexo) : arr;
      const num  = somarColunaCustom(base, col);
      const den  = denominadorSoma(base);
      const pct  = den > 0 ? (num / den) * 100 : 0;
      return { num, den, pct };
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
  const macroPorUF: Record<string, Map<string, string>> = {};

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
    Array.from(RegMap!.entries())
      .sort((a,b) => a[1].localeCompare(b[1]))
      .forEach(([code,name]) => {
        const o = document.createElement("option");
        o.value = code;
        o.text =  name;
        selectMunicipioEl.appendChild(o);
      });

  }
  //Atualiza lista de Regiões conforme UF
  function atualizarMacroRegions(
      ufSelecionada: string, 
      selectMunicipioEl: HTMLSelectElement,
      dataRegion: RegionDataRow[]): void{
    
    
    if (!macroPorUF[ufSelecionada]){
      macroPorUF[ufSelecionada] = new Map();
      dataRegion
        .filter(d => d.uf === ufSelecionada)
        .forEach(d => {
          macroPorUF[ufSelecionada]!.set(d.macro_id, d.macro_nome);
        })
    }
    const MacroMap = macroPorUF[ufSelecionada];
    selectMunicipio.innerHTML = "";    
    Array.from(MacroMap!.entries())
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
  } else if (selectModo.value === "saude"){
    return atualizarRegioes(selectUF.value, selectMunicipio, dataRegion);
  } else {
    return atualizarMacroRegions(selectUF.value, selectMunicipio, dataRegion);
  }
};



export { cidadesFriendly };