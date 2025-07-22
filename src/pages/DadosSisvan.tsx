import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Globe } from "lucide-react";
import { initMapeamento, populateSelectsMapeamento }   from "@/lib/d3/mapeamento";
import { initRegional }     from "@/lib/d3/regional";
import { initTemporal }     from "@/lib/d3/analise_temporal";
import React, { useRef, useEffect, useState } from "react";
import { select, selectAll } from "d3-selection";
import { preloadCidadesFriendly, cidadesFriendly } from "@/lib/d3/global";


export default function DadosSisvan() {
  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Containers de cada gráfico
  const mapeamentoContainer = useRef<HTMLDivElement>(null);
  const regionalContainer   = useRef<HTMLDivElement>(null);
  const temporalContainer   = useRef<HTMLDivElement>(null);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Refs para o gráfico de Mapeamento
  const selectUF             = useRef<HTMLSelectElement>(null);
  const selectMunicipio      = useRef<HTMLSelectElement>(null);
  const selectAno            = useRef<HTMLSelectElement>(null);
  const selectSexo           = useRef<HTMLSelectElement>(null);
  const selectFase           = useRef<HTMLSelectElement>(null);
  const btnMenuAdultoToggle  = useRef<HTMLButtonElement>(null);
  const menuAdultoContainer  = useRef<HTMLDivElement>(null);
  const valorHomensEl        = useRef<HTMLSpanElement>(null);
  const valorMulheresEl      = useRef<HTMLSpanElement>(null);
  const valorTodosEl         = useRef<HTMLSpanElement>(null);
  const adultoColsRef        = useRef<HTMLDivElement>(null);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Refs para o gráfico Regional
  const selectAnoReg         = useRef<HTMLSelectElement>(null);
  const selectSexoReg        = useRef<HTMLSelectElement>(null);
  const selectFaseReg        = useRef<HTMLSelectElement>(null);
  const selectNutricional    = useRef<HTMLSelectElement>(null);
  const selectModoReg        = useRef<HTMLSelectElement>(null);
  const containerDivisaoReg  = useRef<HTMLDivElement>(null);
  const titleReg             = useRef<HTMLHeadingElement>(null);
  const valorMulheresElReg   = useRef<HTMLSpanElement>(null);
  const valorHomensElReg     = useRef<HTMLSpanElement>(null);
  const valorTodosElReg      = useRef<HTMLSpanElement>(null);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Refs para o gráfico Temporal
  const selectUFTemp         = useRef<HTMLSelectElement>(null);
  const selectMunicipioTemp  = useRef<HTMLSelectElement>(null);
  const selectSexoTemp       = useRef<HTMLSelectElement>(null);
  const selectFaseTemp       = useRef<HTMLSelectElement>(null);
  const selectIndicadorTemp  = useRef<HTMLSelectElement>(null);
  const selectModoTemp       = useRef<HTMLSelectElement>(null);
  const selectSubdivTemp     = useRef<HTMLSelectElement>(null);
  const labelMunicipioTemp   = useRef<HTMLLabelElement>(null);
  const labelSubdivTemp      = useRef<HTMLLabelElement>(null);
  const titleTemp            = useRef<HTMLHeadingElement>(null);
  const valorMulheresElTemp  = useRef<HTMLSpanElement>(null);
  const valorHomensElTemp    = useRef<HTMLSpanElement>(null);
  const valorTodosElTemp     = useRef<HTMLSpanElement>(null);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Estados para os filtros de Mapeamento
  const [ufs, setUfs]               = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [anos, setAnos]             = useState<number[]>([]);
  const [sexos]                     = useState<string[]>([]);
  const [fases, setFases]           = useState<string[]>([]);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Estados para os filtros de Regional
  const [anosReg, setAnosReg]               = useState<number[]>([]);
  const [sexosReg]                          = useState<string[]>([]);
  const [fasesReg, setFasesReg]             = useState<string[]>([]);
  const [nutricionais, setNutricionais]     = useState<string[]>([]);
  const [modosReg, setModosReg]             = useState<string[]>([]);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Estados para os filtros de Temporal
  const [ufsTemp, setUfsTemp]               = useState<string[]>([]);
  const [municipiosTemp, setMunicipiosTemp] = useState<string[]>([]);
  const [sexosTemp]                         = useState<string[]>([]);
  const [fasesTemp, setFasesTemp]           = useState<string[]>([]);
  const [indicadores, setIndicadores]       = useState<string[]>([]);
  const [modosTemp, setModosTemp]           = useState<string[]>([]);
  const [subdivsTemp, setSubdivsTemp]       = useState<string[]>([]);
  const [muniLabel, setMuniLabel]           = useState("Municípios");

  const handleModoTempChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modo = e.target.value;
    setMuniLabel(modo === 'federativa' ? 'Municípios' : 'Regiões de Saúde');
  }

  useEffect(()=>{
    async function setupFiltros(){
      await preloadCidadesFriendly();

      if (
      selectUF.current &&
      selectMunicipio.current &&
      selectAno.current &&
      selectSexo.current &&
      selectFase.current
    ) {
      populateSelectsMapeamento(
        selectUF.current,
        selectMunicipio.current,
        selectAno.current,
        selectSexo.current,
        selectFase.current
      );
      }  
    }

    setupFiltros();
  }, []); 
  

    

  useEffect(() => {
    const adultoCols = adultoColsRef.current   ?.querySelectorAll<HTMLInputElement>("input") ?? null;
    const containerDivSelection = containerDivisaoReg.current  ? select<HTMLElement, unknown>(containerDivisaoReg.current): null;
    // ←── AQUI: configura o resize só para o Mapeamento ──→
    const handleResize = () => {
      // Re-executa o initMapeamento com os mesmos refs
      initMapeamento(
        mapeamentoContainer.current!,
        selectUF.current!,
        selectMunicipio.current!,
        selectAno.current!,
        selectSexo.current!,
        selectFase.current!,
        btnMenuAdultoToggle.current!,
        menuAdultoContainer.current!,
        valorHomensEl.current!,
        valorMulheresEl.current!,
        valorTodosEl.current!,
        adultoCols
      );
    }; 
    // Inicializa o gráfico de Mapeamento
    if (
      mapeamentoContainer.current &&
      selectUF.current &&
      selectMunicipio.current &&
      selectAno.current &&
      selectSexo.current &&
      selectFase.current &&
      btnMenuAdultoToggle.current &&
      menuAdultoContainer.current &&
      valorHomensEl.current &&
      valorMulheresEl.current &&
      valorTodosEl.current &&
      adultoCols
    ) {
      initMapeamento(
        mapeamentoContainer.current,
        selectUF.current,
        selectMunicipio.current,
        selectAno.current,
        selectSexo.current,
        selectFase.current,
        btnMenuAdultoToggle.current,
        menuAdultoContainer.current,
        valorHomensEl.current,
        valorMulheresEl.current,
        valorTodosEl.current,
        adultoCols
      );
      
      window.addEventListener("resize", handleResize);
            
    }

    // Inicializa o gráfico Regional
    if (
      regionalContainer.current &&
      selectAnoReg.current &&
      selectSexoReg.current &&
      selectFaseReg.current &&
      selectNutricional.current &&
      selectModoReg.current &&
      containerDivSelection &&
      titleReg.current &&
      valorMulheresElReg.current &&
      valorHomensElReg.current &&
      valorTodosElReg.current
    ) {
      initRegional(
        regionalContainer.current,
        selectAnoReg.current,
        selectSexoReg.current,
        selectFaseReg.current,
        selectNutricional.current,
        selectModoReg.current,
        containerDivSelection,
        titleReg.current,
        valorMulheresElReg.current,
        valorHomensElReg.current,
        valorTodosElReg.current
      );
    }

    // Inicializa o gráfico Temporal
    if (
      temporalContainer.current &&
      selectUFTemp.current &&
      selectMunicipioTemp.current &&
      selectSexoTemp.current &&
      selectFaseTemp.current &&
      selectIndicadorTemp.current &&
      selectModoTemp.current &&
      labelMunicipioTemp.current &&
      labelSubdivTemp.current &&
      titleTemp.current
    ) {
      initTemporal(
        temporalContainer.current,
        selectUFTemp.current,
        selectMunicipioTemp.current,
        selectSexoTemp.current,
        selectFaseTemp.current,
        selectIndicadorTemp.current,
        selectModoTemp.current,
        labelMunicipioTemp.current,
        labelSubdivTemp.current,
        titleTemp.current
      );
    }
    // Cleanup: remove o listener quando desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
        
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Dados SISVAN
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore visualizações interativas dos dados do Sistema de Vigilância 
            Alimentar e Nutricional, organizados em três perspectivas complementares.
          </p>
        </div>
        <div className="fixed bottom-10 right-5 z-50 max-w-md bg-yellow-100 text-gray-800 p-4 border border-yellow-300 rounded shadow font-bold">
          🚨 Atenção: Projeto em transição! Terá alguns bugs, como por exemplo: alguns dados/gráficos podem estar errados/quebrados. Este aviso será removido quando estiver tudo certo. Att. Dev.
        </div>

        {/* Data Visualization Tabs */}
        <Tabs defaultValue="mapeamento" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mapeamento" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mapeamento Estadual
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Mapeamento Regional
            </TabsTrigger>
            <TabsTrigger value="temporal" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Análises Temporais
            </TabsTrigger>
          </TabsList>

          {/* Mapeamento do Estado Nutricional */}
          <TabsContent forceMount value="mapeamento" className="data-[state=inactive]:hidden data-[state=active]:block">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    Mapeamento do Estado Nutricional
                  </h2>
                  <p className="text-muted-foreground">
                    Visualização detalhada dos indicadores nutricionais distribuídos 
                    pelos estados brasileiros, permitindo identificar padrões regionais 
                    e áreas que requerem atenção especial.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-2 w-full flex gap-6">
                  <div className="w-1/5 flex  flex-col gap-6">
                    <div className="bg-white p-4 rounded-md shadow-md h-[24rem] text-sm">
                      <label htmlFor="selectUF" className="block font-semibold mt-2 text-base">Unidade Federativa</label>
                      <select id="selectUF" ref={selectUF} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione a UF</option>
                        {ufs.map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>

                      <label htmlFor="selectMunicipio" className="block font-semibold mt-2 text-base">Municípios</label>
                      <select id="selectMunicipio" ref={selectMunicipio} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Municípios</option>
                        {municipios.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <label htmlFor="selectAno" className="block font-semibold mt-2 text-base">Ano</label>
                      <select id="selectAno" ref={selectAno} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o ano</option>
                        {anos.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>

                      <label htmlFor="selectSexo" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select ref={selectSexo} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o sexo</option>
                        {sexos.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      <label htmlFor="selectFase" className="block font-semibold mt-2 text-base">Fase da Vida</label>
                      <select id="selectFase" ref={selectFase} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione a fase de vida</option>
                        {fases.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-green mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosEl}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-orange mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresEl}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-blue mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensEl}>0</span>
                        </li>
                      </ul>
                    </div>
                                       
                  </div>
                  {/* coluna direita = gráfico + botão */}
                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md relative">

                    {/*espaço para o gráfico*/}
                    <div id='graficoMapeamento' ref={mapeamentoContainer} className="w-full h-full" />

                    {/*botão de adulto + checkboxes*/}
                    <button ref={btnMenuAdultoToggle} 
                    className="absolute top-2 right-2 bg-nutrition-green text-white px-2 py-1 rounded">	&#10695;</button>
                    
                    <div ref={menuAdultoContainer}  id="menuAdultoContainer" 
                    className="absolute top-12 right-2 bg-white p-2 shadow-md rounded-md hidden">
                      <h2 className="font-bold mb-2">Indicadores</h2>

                      <div ref={adultoColsRef} className="space-y-1 flex flex-col">
                        <label>
                          <input type="checkbox" name="adultoCols" value="baixo_peso" checked />
                          Baixo Peso
                        </label>
                        <label>
                          <input type="checkbox" name="adultoCols" value="eutrofico" checked />
                          Eutrófico
                        </label>
                        <label>
                          <input type="checkbox" name="adultoCols" value="sobrepeso" checked />
                          Sobrepeso
                        </label>
                        <label>
                          <input type="checkbox" name="adultoCols" value="obesidade_G_1" checked />
                          Obesidade I
                        </label>
                        <label>
                          <input type="checkbox" name="adultoCols" value="obesidade_G_2" checked />
                          Obesidade II
                        </label>
                        <label>
                          <input type="checkbox" name="adultoCols" value="obesidade_G_3" checked />
                          Obesidade III
                        </label>

                        <label>
                          <input type="checkbox" name="adultoCols" value="excesso_peso" />
                          Excesso de Peso
                        </label>
                        
                        {/*<!-- Obesidade (soma de obesidade_G_1 + obesidade_G_2 + obesidade_G_3) -->*/}
                        <label>
                          <input type="checkbox" name="adultoCols" value="obesidade_calc" />
                          Obesidade
                        </label>
                      </div>
                    </div>                    

                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nutrition-green/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-green mb-2">Baixo Peso</h4>
                    <p className="text-sm text-muted-foreground">
                      Estados com maior prevalência de baixo peso
                    </p>
                  </div>
                  <div className="bg-nutrition-orange/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-orange mb-2">Sobrepeso</h4>
                    <p className="text-sm text-muted-foreground">
                      Distribuição do sobrepeso por estado
                    </p>
                  </div>
                  <div className="bg-nutrition-blue/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-blue mb-2">Obesidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Índices de obesidade por região
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mapeamento Regional */}
          <TabsContent forceMount value="regional" className="data-[state=inactive]:hidden data-[state=active]:block">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 ref={titleReg} className="text-2xl font-bold mb-3 text-foreground">
                    Mapeamento Regional
                  </h2>
                  <p className="text-muted-foreground">
                    Comparação entre as cinco regiões brasileiras, destacando 
                    diferenças regionais nos padrões nutricionais e identificando 
                    características específicas de cada região.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-2 w-full flex gap-6">
                  <div className="w-1/5 flex  flex-col gap-6">
                    <div className="bg-white p-4 rounded-md shadow-md h-[24rem] text-sm">
                  {/* Filtros Regionais */}
                      <label htmlFor="filtro-ano" className="block font-semibold mt-2 text-base">Ano</label>
                      <select id="filtro-ano" ref={selectAnoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Ano</option>
                        {anosReg.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>

                      <label htmlFor="filtro-sexo" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select id="filtro-sexo" ref={selectSexoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Gênero</option>
                        {sexosReg.map(s => (
                          <option key={s} value={s}>
                            {s === "masc" ? "Masculino" : "Feminino"}
                          </option>
                        ))}
                      </select>

                      <label htmlFor="filtro-fasevida" className="block font-semibold mt-2 text-base">Fase da vida</label>
                      <select id="filtro-fasevida" ref={selectFaseReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Fase de vida</option>
                        {fasesReg.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      
                      <label htmlFor="filtroNutricional" className="block font-semibold mt-2 text-base">Estado Nutricional</label>
                      <select id="filtroNutricional" ref={selectNutricional} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Estado nutricional</option>
                        {nutricionais.map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>

                      <div className="containerDiv hidden" ref={containerDivisaoReg}>
                        <label htmlFor="filtro-divisao" className="block font-semibold mt-2 text-base">Divisão</label>
                        <select id="filtro-divisao" ref={selectModoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Divisão</option>
                        {modosReg.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                          
                        </select>
                      </div>
                    </div>            

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-green mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosElReg}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-orange mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresElReg}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-blue mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensElReg}>0</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md flex items-center">
                    <div id="mapaRegional" ref={regionalContainer} className="flex-1 mx-auto" />
                    <div id="legendRegional" className="legendRegional" />
                  </div>
                  <div id="regional-tooltip" className="tooltip-regional hidden"></div>

                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Norte</h4>
                    <p className="text-xs text-background">7 Estados</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Nordeste</h4>
                    <p className="text-xs text-background">9 Estados</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Centro-Oeste</h4>
                    <p className="text-xs text-background">4 Estados</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Sudeste</h4>
                    <p className="text-xs text-background">4 Estados</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Sul</h4>
                    <p className="text-xs text-background">3 Estados</p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análises Temporais */}
          <TabsContent forceMount value="temporal" className="data-[state=inactive]:hidden data-[state=active]:block">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 ref={titleTemp} className="text-2xl font-bold mb-3 text-foreground">
                    Análises Temporais
                  </h2>
                  <p className="text-muted-foreground">
                    Evolução dos indicadores nutricionais ao longo do tempo, 
                    permitindo identificar tendências, sazonalidades e o impacto 
                    de políticas públicas implementadas.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-2 w-full flex gap-6">
                  <div className="w-1/5 flex  flex-col gap-6">
                    <div className="bg-white p-4 rounded-md shadow-md h-[28rem] text-sm">
                      {/* Filtros Temporais */}
                      <label htmlFor="filtroUFTemp" className="block font-semibold mt-2 text-base">Unidade Federativa</label>
                      <select id="filtroUFTemp" ref={selectUFTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione a UF</option>
                        {ufsTemp.map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>

                      
                      <label htmlFor="filtro-muni" ref={labelMunicipioTemp} className="block font-semibold mt-2 text-base">Município</label>
                      <select id="filtro-muni" ref={selectMunicipioTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                      <option value="">Selecione o Município</option>
                      {modosReg.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                        
                      </select>

                      <label htmlFor="filtro-modoTemp" ref={labelSubdivTemp} className="block font-semibold mt-2 text-base">Divisão</label>
                      <select id="filtro-modoTemp"ref={selectModoTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                      <option value="">Selecione a Divisão</option>
                      {modosReg.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                        
                      </select>

                      <label htmlFor="filtroSexoTemp" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select id="filtroSexoTemp" ref={selectSexoTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o Gênero</option>
                        {sexosTemp.map(s => (
                          <option key={s} value={s}>
                            {s === "M" ? "Masculino" : "Feminino"}
                          </option>
                        ))}
                      </select>

                      <label htmlFor="filtroFaseTemp" className="block font-semibold mt-2 text-base">Fase da Vida</label>
                      <select id="filtroFaseTemp" ref={selectFaseTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione a Fase da Vida</option>
                        {fasesTemp.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>

                      <label htmlFor="filtroNutriTemp" className="block font-semibold mt-2 text-base">Estado Nutricional</label>
                      <select id="filtroNutriTemp" ref={selectIndicadorTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o Estado Nutricional</option>
                        {indicadores.map(i => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-green mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosElTemp}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-orange mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresElTemp}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-blue mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensElTemp}>0</span>
                        </li>
                      </ul>
                    </div>    
                  </div>

                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md flex items-center">
                    <div ref={temporalContainer} className="mx-auto flex-1" />
                  </div>
                
                </div>

                {/*Cards abaixo do gráfico */}
                <div className="mt-6 grid grid-cols-3 md:grid-cols-3 gap-6">
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Número de Entrevistados</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-green mt-1"></div>
                          <span className="text-muted-foreground">Todos:</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-orange mt-1"></div>
                          <span className="text-muted-foreground">Feminino:</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-blue mt-1"></div>
                          <span className="text-muted-foreground">Masculino:</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Tendências Identificadas</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-green mt-1.5"></div>
                          <span className="text-muted-foreground">Redução da desnutrição infantil</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-orange mt-1.5"></div>
                          <span className="text-muted-foreground">Aumento do sobrepeso em adultos</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-blue mt-1.5"></div>
                          <span className="text-muted-foreground">Estabilização da obesidade infantil</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Período Analisado</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Início dos dados:</span>
                          <span className="font-medium">2008</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dados mais recentes:</span>
                          <span className="font-medium">2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="font-medium">Anual</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        <Card className="mt-8 shadow-medium bg-muted/50">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
              Sobre os Gráficos D3.js
            </h3>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Os espaços acima estão preparados para receber gráficos interativos desenvolvidos 
              com a biblioteca D3.js. Cada seção foi projetada para apresentar os dados do SISVAN 
              de forma clara e intuitiva, permitindo exploração detalhada dos indicadores nutricionais.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}