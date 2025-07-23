import * as G from "./global";
import * as d3 from "d3";
import type { FeatureCollection } from "geojson";
import { csv } from "d3-fetch";

/**
 * Inicializa o módulo de Mapeamento de indicadores
 * @param {HTMLElement} container - elemento onde o SVG será inserido
 * @param {HTMLSelectElement} selectUF - select de UF
 * @param {HTMLSelectElement} selectMunicipio - select de Município
 * @param {HTMLSelectElement} selectAno - select de Ano
 * @param {HTMLSelectElement} selectSexo - select de Sexo
 * @param {HTMLSelectElement} selectFase - select de Fase de Vida
 * @param {HTMLButtonElement} btnMenuAdultoToggleEl - botão que alterna o menu adulto
 * @param {HTMLElement} menuAdultoContainerEl - container do menu adulto
 * @param {NodeListOf<HTMLInputElement>} adultoCols - checkboxes de indicadores adultos
 */

// 1) Declare o tipo de cada linha de dados que chega do CSV
interface DataRow {
  // campos fixos que você usa:
  UF: string
  codigo_municipio: string
  ANO: string
  fase_vida: string
  indicador: string
  SEXO: string
  total: string

  // colunas numéricas que você soma
  sobrepeso: number
  obesidade_G_1: number
  obesidade_G_2: number
  obesidade_G_3: number

  // permite acessar qualquer coluna pelo nome dinâmico
  [key: string]: string | number
}

interface SisvanRow {
  UF: string;
  codigo_municipio: string;
  municipio: string;
  ANO: string;
  SEXO: string;
  fase_vida: string;
}

export function populateSelectsMapeamento (
    selectUFEl: HTMLSelectElement,
    selectMunicipioEl: HTMLSelectElement,
    selectAnoEl: HTMLSelectElement,
    selectSexoEl: HTMLSelectElement,
    selectFaseEl: HTMLSelectElement
  ){
    csv(G.csvDataUrl,
      // esta função recebe cada linha bruta e devolve um SisvanRow
      (d): SisvanRow => ({
        UF:             d.UF,
        codigo_municipio: d.codigo_municipio,
        municipio:      d.municipio,
        ANO:            d.ANO,
        SEXO:           d.SEXO,
        fase_vida:      d.fase_vida
      })
    ).then((data) => {
      // ---UFs---
      const ufs = Array.from(new Set(data.map(d => d.UF))).sort();
      selectUFEl.innerHTML = '<option value="">Brasil</option>';
      ufs.forEach(uf => {
        const opt = document.createElement("option");
        opt.value = uf;
        opt.text = G.ufLabel[uf] ? `${G.ufLabel[uf]} (${uf})` : uf;
        selectUFEl.appendChild(opt);



      });
      // ao mudar UF, atualiza municípios
      selectUFEl.addEventListener("change", () =>
        atualizarMunicipios(selectUFEl.value, selectMunicipioEl, data)
      );

      // ---Anos---
      const anos = Array.from(new Set(data.map(d => d.ANO))).sort().reverse();
      selectAnoEl.innerHTML = "";
      anos.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a;
        opt.text = a;
        selectAnoEl.appendChild(opt);
      });

      if (anos.length) {
        const maxAno = anos[0];
        selectAnoEl.value = maxAno;
        selectAnoEl.dispatchEvent(new Event("change"));
      }

      // ---Sexo---
      selectSexoEl.innerHTML = "";
      ["", "masc", "fem"].forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        if (!s) {
          opt.text = "Todos";
        } else {
          opt.text = s === "masc" ? "Masculino" : "Feminino";
        }
        selectSexoEl.appendChild(opt);
      });

      // ---Fase de vida---
      const fases = Array.from(new Set(data.map(d => d.fase_vida)));
      selectFaseEl.innerHTML = "";
      fases.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f;
        opt.text = G.faseLabel[f] ?? f;
        selectFaseEl.appendChild(opt);
        
      });


      if (fases.length) {
          selectFaseEl.value = fases[fases.length - 1];
          selectFaseEl.dispatchEvent(new Event("change"));
        }
      atualizarMunicipios(selectUFEl.value, selectMunicipioEl, data);
        

      function atualizarMunicipios(
        ufSelecionada: string,
        selectMunicipioEl: HTMLSelectElement,
        data: SisvanRow[]
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
          const label = G.cidadesFriendly[ufSelecionada][m.code] || m.name;
          const opt = document.createElement("option");
          opt.value = m.name;
          opt.text = label;
          selectMunicipioEl.appendChild(opt);
        });
        
      }


    });
    

  }  



/**
 * Soma colunas especiais (“excesso_peso” e “obesidade_calc”) ou qualquer outra coluna numérica.
 * @param arr array de objetos DataRow
 * @param col chave de DataRow que será somada
 * @returns total acumulado (0 se vazio)
 */

export function initMapeamento(
  container: HTMLElement,
  selectUF: HTMLSelectElement,
  selectMunicipio: HTMLSelectElement,
  selectAno: HTMLSelectElement,
  selectSexo: HTMLSelectElement,
  selectFase: HTMLSelectElement,
  btnMenuAdultoToggleEl: HTMLButtonElement,
  menuAdultoContainerEl: HTMLElement,
  valorHomensEl: HTMLElement,
  valorMulheresEl: HTMLElement,
  valorTodosEl: HTMLElement,
  adultoCols: NodeListOf<HTMLInputElement>,
) {
  let allData = [];
  csv(G.csvDataUrl).then((data) => {

    allData = data;
    populateSelectsMapeamento(
      selectUFEl, selectMunicipioEl, selectAnoEl,
      selectSexoEl, selectFaseEl
    );
    atualizarTitulo();
    atualizarGrafico();

  });

  interface IndicadorDatum{
    indicador: string;
    Masc: number;
    Fem: number;
    Todos: number;
    
  }
  // Substitui document.getElementById pelos parâmetros
  const selectUFEl = selectUF;
  const selectMunicipioEl = selectMunicipio;
  const selectAnoEl = selectAno;
  const selectSexoEl = selectSexo;
  const selectFaseEl = selectFase;

  // Alterna o menu adulto
  btnMenuAdultoToggleEl.addEventListener("click", () => {
    menuAdultoContainerEl.classList.toggle("hidden");
  });

  // Listeners para checkboxes adulto
  adultoCols.forEach(chk => {
    chk.addEventListener("change", handleAdultoCheckboxChange);
  });

  // --- Funções originais --- //
  function handleAdultoCheckboxChange(e) {
    const checkbox = e.target as HTMLInputElement;
    checkbox.dataset.userModified = "true";
    const isChecked = checkbox.checked;
    const value = checkbox.value;

    if (value === "excesso_peso" && isChecked) {
      G.conflicts.excesso_peso.forEach(col => {
        if (col === "excesso_peso") return;
        const chkEl = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl) {
          chkEl.checked = false;
          chkEl.disabled = true;
          chkEl.parentElement.classList.add("checkbox-disabled");
        }
      });
    } else if (value === "excesso_peso" && !isChecked) {
      G.conflicts.excesso_peso.forEach(col => {
        if (col === "excesso_peso") return;
        const chkEl = document.querySelector<HTMLSelectElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl) {
          chkEl.disabled = false;
          chkEl.parentElement.classList.remove("checkbox-disabled");
        }
      });
    }
    if (value === "obesidade_calc" && isChecked) {
      G.conflicts.obesidade_calc.forEach(col => {
        if (col === "obesidade_calc") return;
        const chkEl = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl) {
          chkEl.checked = false;
          chkEl.disabled = true;
          chkEl.parentElement.classList.add("line-through", "text-gray-400");
        }
      });
    } else if (value === "obesidade_calc" && !isChecked) {
      G.conflicts.obesidade_calc.forEach(col => {
        if (col === "obesidade_calc") return;
        const chkEl = document.querySelector<HTMLSelectElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl) {
          chkEl.disabled = false;
          chkEl.parentElement.classList.remove("line-through", "text-gray-400");
        }
      });
    }
    // Sincronizações adicionais
    if (document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="obesidade_calc"]`).checked) {
      ["baixo_peso", "eutrofico", "sobrepeso"].forEach(col => {
        const chkEl = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl && !chkEl.checked) chkEl.checked = true;
      });
    }
    if (document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="excesso_peso"]`).checked) {
      ["baixo_peso", "eutrofico"].forEach(col => {
        const chkEl = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="${col}"]`);
        if (chkEl && !chkEl.checked) chkEl.checked = true;
      });
    }
    const excessoPesoMarcado = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="excesso_peso"]`).checked;
    const obesidadeCalcMarcado = document.querySelector<HTMLInputElement>(`input[name="adultoCols"][value="obesidade_calc"]`).checked;
    if (!excessoPesoMarcado && !obesidadeCalcMarcado) {
      document.querySelectorAll<HTMLInputElement>(`input[name="adultoCols"]`).forEach(chk => {
        if (chk.value !== "excesso_peso" && chk.value !== "obesidade_calc" && !chk.dataset.userModified) {
          chk.checked = true;
        }
      });
    }
    atualizarGrafico();
  }
  


  function somarColunaCustom(
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

  function atualizarGrafico(): void {
  // 1) captura valores dos selects (todos são HTMLSelectElement)
  const ufSelecionada       = selectUFEl.value;
  const municipioSelecionado= selectMunicipioEl.value;
  const anoSelecionado      = selectAnoEl.value;
  const selectFaseInicial   = selectFaseEl.value;
  const faseSelecionada     = selectFaseInicial === "" ? "adulto" : selectFaseInicial;   // “adolescente” | “adulto”
  const selectSexoInicial   = selectSexoEl.value;
  const sexoSelecionado     = selectSexoInicial === "" ? "Todos" : selectSexoInicial;   // “Masc” | “Fem” | “Todos”

  // 2) exibe ou oculta botão/menu de adulto (HTMLButtonElement e HTMLElement)
  if (faseSelecionada === "adulto") {
    btnMenuAdultoToggleEl.classList.remove("hidden");
    menuAdultoContainerEl.classList.add("hidden");
  } else {
    btnMenuAdultoToggleEl.classList.add("hidden");
    menuAdultoContainerEl.classList.add("hidden");
  }

  // 3) filtra o allData (DataRow[]) conforme seleções
  const dadosFiltrados = allData.filter(d => {
    if (faseSelecionada === "adolescente") {
      if (d.RACA_COR !== "todos" || d.INDICE !== "IMCxIdade") return false;
    }
    if (d.fase_vida !== faseSelecionada) return false;
    if (ufSelecionada       && d.UF !== ufSelecionada) return false;
    if (municipioSelecionado&& String(d.codigo_municipio) !== municipioSelecionado) return false;
    if (anoSelecionado      && d.ANO !== anoSelecionado) return false;
    if (sexoSelecionado !== "Todos" && d.SEXO !== sexoSelecionado)     return false;
    return true;
  });

  // 4) decide quais colunas usar
  let colunasIndicadores: (keyof DataRow)[];
  if (faseSelecionada === "adolescente") {
    colunasIndicadores = ["magreza_acentuada","magreza","obesidade","obesidade_grave"];
  } else {
    // pega todos os checkboxes adultos marcados
    const chks = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name="adultoCols"]:checked')
    );
    colunasIndicadores = chks.map(c => c.value as keyof DataRow);
  }

  // 5) agrupa por SEXO e soma entrevistados
  const dadosPorSexo = d3.group(dadosFiltrados, d => d.SEXO);
  const totalFem = dadosPorSexo.get("Fem")
    ? d3.sum(dadosPorSexo.get("Fem")!, d => +d.total)
    : 0;
  const totalMasc = dadosPorSexo.get("Masc")
    ? d3.sum(dadosPorSexo.get("Masc")!, d => +d.total)
    : 0;
  const totalTodos = totalFem + totalMasc;

  // 6) atualiza os contadores no DOM (elementos passados ao init)
  valorHomensEl.textContent   = totalMasc.toLocaleString("pt-BR");
  valorMulheresEl.textContent = totalFem.toLocaleString("pt-BR");
  valorTodosEl.textContent    = totalTodos.toLocaleString("pt-BR");

  // 7) consolida valores por indicador e sexo
  const somaPorSexo: Record<"Fem"|"Masc"|"Todos", Record<string,number>> = {
    Fem: {}, Masc: {}, Todos: {}
  };
  colunasIndicadores.forEach(col => {
    somaPorSexo.Fem[col]   = somarColunaCustom(dadosPorSexo.get("Fem")   || [], col);
    somaPorSexo.Masc[col]  = somarColunaCustom(dadosPorSexo.get("Masc")  || [], col);
    somaPorSexo.Todos[col] = somaPorSexo.Fem[col] + somaPorSexo.Masc[col];
  });

  // 8) transforma em percentuais
  const grandTotal = Object.values(somaPorSexo.Fem)
    .concat(Object.values(somaPorSexo.Masc))
    .reduce((a,b) => a + b, 0);
  if (grandTotal > 0) {
    colunasIndicadores.forEach(col => {
      somaPorSexo.Fem[col]   = (somaPorSexo.Fem[col]   / grandTotal) * 100;
      somaPorSexo.Masc[col]  = (somaPorSexo.Masc[col]  / grandTotal) * 100;
      somaPorSexo.Todos[col] = somaPorSexo.Fem[col] + somaPorSexo.Masc[col];
    });
  }

  // 9) prepara array para o D3 desenhar
  const dadosParaGrafico: IndicadorDatum[] = colunasIndicadores.map(col => ({
    indicador: String(col),
    Fem:   somaPorSexo.Fem[col],
    Masc:  somaPorSexo.Masc[col],
    Todos: somaPorSexo.Todos[col],
  }));

  // 10) chama sua função de desenho, passando o array tipado
  desenharGrafico(dadosParaGrafico);
  
  
  
}


  function recuperarNomeMunicipio() {
    const registro = allData.find(d => String(d.codigo_municipio) === selectMunicipioEl.value);
    if (!registro) return Promise.resolve(null);
    const ufMun = registro.UF;
    const idMun = String(registro.codigo_municipio);
    const friendly = G.cidadesFriendly[ufMun]?.[idMun] || null;
    return Promise.resolve(friendly ? `${friendly}-${ufMun}` : null);
  }

  function atualizarTitulo() {
    // 1) capta valores dos selects
    const fase = selectFaseEl.value;
    const sexo = selectSexoEl.value;
    const uf = selectUFEl.value || "Brasil";
    const ano = selectAnoEl.value;

    // 2) resolve nome amigável do município (ou null)
    recuperarNomeMunicipio().then(municipioAmigavel => {
      // 3) monta a string do título
      const base = `Mapeamento de Estados Nutricionais em ${G.faseLabel[fase]} ${G.sexoLabel[sexo]}`;
      const local = municipioAmigavel && municipioAmigavel.trim()
        ? `${municipioAmigavel} ${ano}`
        : `${G.ufLabel[uf]} ${ano}`;
      const novoTitulo = `${base} - ${local}`;

      // 4) atualiza o <h2> específico
      const titleEl = document.getElementById("titulo-mapeamento");
      if (titleEl) {
        titleEl.textContent = novoTitulo;
      }
    });
    
  }
  

  function desenharGrafico(dados: IndicadorDatum[]) {
  // 1) Limpa tudo que já existe no container
  const container = d3.select("#graficoMapeamento");
  container.selectAll("*").remove();

  // 2) Define margens e dimensões
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  // 2.1) Pega o tamanho real do container em Pixels
  const bbox = (container.node() as HTMLElement).getBoundingClientRect();
  const totalWidth  = bbox.width;
  const totalHeight = bbox.height;    // se quiser altura fixa, use um valor interno aqui
  const width       = totalWidth  - margin.left - margin.right;
  const height      = totalHeight - margin.top  - margin.bottom;

  // 3) Cria o SVG com viewBox e preserveAspectRatio
  const svg = container
    .append("svg")
      .attr("viewBox", `0 0 ${totalWidth} ${totalHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // 4) Escalas
  const x0 = d3.scaleBand()
    .domain(dados.map(d => d.indicador))
    .range([0, width])
    .paddingInner(0.1);

  const y = d3.scaleLinear()
    .domain([0, 100])
    .nice()
    .range([height, 0]);

  // 5) Eixos
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x0).tickFormat(d => G.nomeAmigavel[d] || d));
  xAxis.selectAll("text").classed("text-[14px]", true);

  const yAxis = svg.append("g")
    .call(d3.axisLeft(y).ticks(10).tickFormat(d => d + "%"));
  yAxis.selectAll("text").classed("text-[14px]", true);

  // 6) Qual filtro de sexo está ativo?
  const selectedSexo = selectSexoEl.value;

  if (selectedSexo === "") {
    // Criar sub-escala para total vs stacked
    const groups = ["total", "stacked"];
    const x1 = d3.scaleBand()
      .domain(groups)
      .range([0, x0.bandwidth()])
      .padding(0.1);

    // G container por indicador
    const gIndicador = svg.selectAll("g.indicador-group")
      .data(dados)
      .enter()
      .append("g")
        .attr("class", "indicador-group")
        .attr("transform", d => `translate(${x0(d.indicador)},0)`);

    // Barra “Total”
    gIndicador.append("rect")
      .attr("x", d => x1("total") + x1.bandwidth() * 0.25)
      .attr("y", d => y(d.Todos))
      .attr("width", x1.bandwidth() * 0.7)
      .attr("height", d => height - y(d.Todos))
      .classed("fill-primary", true)
      .on("mouseover", (event, d) => {
        G.showTooltip(`
          <strong>${G.nomeAmigavel[d.indicador]}</strong><br/>
          Valor Total: ${d.Todos.toFixed(2)}%
        `, event);
      })
      .on("mousemove", G.moveTooltip)
      .on("mouseout", G.hideTooltip);

    

    // Barra empilhada (Masc + Fem)
    const stackGen = d3.stack().keys(["Masc","Fem"]);
    gIndicador.each(function(d) {
      const thisGroup = d3.select(this);
      const numericOnly = {  
        Masc: d.Masc,
        Fem:  d.Fem
      };
      const series = stackGen([numericOnly]);
      thisGroup.selectAll("rect.stacked")
        .data(series)
        .enter()
        .append("rect")
          .attr("class", s => `stacked ${s.key==="Masc"?"fill-accent":"fill-secondary"}`)
          .attr("x", x1("stacked") + x1.bandwidth() * 0.05)
          .attr("y", s => y(s[0][1]))
          .attr("height", s => y(s[0][0]) - y(s[0][1]))
          .attr("width", x1.bandwidth()*0.3)
        .on("mouseover", (event, s) => {
          const value = s[0][1] - s[0][0];
          G.showTooltip(`
            <strong>${G.nomeAmigavel[d.indicador]}</strong><br/>
            Sexo: ${G.sexoLabel[s.key]}<br/>
            Valor: ${value.toFixed(2)}%
          `, event);
        })
        .on("mousemove", G.moveTooltip)
        .on("mouseout", G.hideTooltip);
    });

  } else {
    // Apenas Masc ou Fem
    const raw = selectSexoEl.value.toLowerCase();
    const key = raw === "masc"    ? "Masc"
              : raw === "fem"     ? "Fem"
              : /*  === "todos"*/   "Todos";
    svg.selectAll("g.indicador-group")
      .data(dados)
      .enter()
      .append("g")
        .attr("class","indicador-group")
        .attr("transform", d => `translate(${x0(d.indicador)},0)`)
      .append("rect")
        .attr("x", x0.bandwidth()*0.25)
        .attr("y",      d => y(d[key]))
        .attr("height", d => height - y(d[key]))
        .attr("width", x0.bandwidth()*0.5)
        .classed(`fill-${key.toLowerCase()}`, true)
        .on("mouseover", (event, d) => {
          G.showTooltip(`
            <strong>${G.nomeAmigavel[d.indicador]}</strong><br/>
            Valor: ${d[key].toFixed(2)}%
          `, event);
        })
        .on("mousemove", G.moveTooltip)
        .on("mouseout", G.hideTooltip);
  }

  // 7) Rótulo do eixo Y
  // desenha o rótulo do eixo Y, rotacionado e centralizado
  svg.append("text")
    .attr("transform", "rotate(-90)")
    // ajusta o X para ficar centrado verticalmente, considerando margin.top
    .attr("x", -(height/(1.5) - margin.top))
    .attr("y", -45)
    .classed("text-[18px] font-semibold", true)
    .text("Prevalência");  

  };
  

}
