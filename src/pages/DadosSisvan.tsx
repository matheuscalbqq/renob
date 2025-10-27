import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, CheckSquare2} from "lucide-react";
import { GiBrazil } from "react-icons/gi";
import { initMapeamento, resizeMapeamento, promiseDados, promiseRegioes }   from "@/lib/d3/mapeamento";
import { initRegional }     from "@/lib/d3/regional";
import { initTemporal }     from "@/lib/d3/analise_temporal";
import { useRef, useEffect, useState } from "react";
import { select } from "d3-selection";
import { preloadCidadesFriendly, debounce, REGIONAL_RESIZE_PROP, TEMPORAL_RESIZE_PROP } from "@/lib/d3/global";
import * as G from "@/lib/d3/global";


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
  const selectDivisao        = useRef<HTMLSelectElement>(null);
  const labelMunReg          = useRef<HTMLLabelElement>(null);
  const labelDiv             = useRef<HTMLLabelElement>(null);
  const selectAno            = useRef<HTMLSelectElement>(null);
  const selectSexo           = useRef<HTMLSelectElement>(null);
  const titleMap             = useRef<HTMLHeadingElement>(null);
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
  const selectIndicadorTemp  = useRef<HTMLSelectElement>(null);
  const selectModoTemp       = useRef<HTMLSelectElement>(null);
  const labelMunicipioTemp   = useRef<HTMLLabelElement>(null);
  const labelSubdivTemp      = useRef<HTMLLabelElement>(null);
  const titleTemp            = useRef<HTMLHeadingElement>(null);
  const valorMulheresElTemp  = useRef<HTMLSpanElement>(null);
  const valorHomensElTemp    = useRef<HTMLSpanElement>(null);
  const valorTodosElTemp     = useRef<HTMLSpanElement>(null);

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Estados para os filtros de Mapeamento
  const [data, setData]             = useState<G.DataRow[]>([]);
  const [regions, setRegions]       = useState<G.RegionDataRow[]>([]);


  useEffect(()=>{
    async function preload(){
      await preloadCidadesFriendly();
      const [regs, dados] = await Promise.all([promiseRegioes,promiseDados]);
      setRegions(regs);
      setData(dados);
    }
    preload();
  }, []);

  const initializedRef = useRef(false);
  useEffect(() => {
    if(!data.length || !regions.length) return;
    if (initializedRef.current) return; // já inicializou antes
    initializedRef.current = true;


    const adultoCols            = adultoColsRef.current   
                                ?.querySelectorAll<HTMLInputElement>("input") 
                                ?? null;
    const containerDivSelection = containerDivisaoReg.current  
                                ? select<HTMLElement, unknown>(containerDivisaoReg.current)
                                : null;
    
    // ←── AQUI: configura o resize só para o Mapeamento ──→
    const handleResize = () => {
      // Re-executa o initMapeamento com os mesmos refs
      resizeMapeamento(
        data,
        regions,
        titleMap.current!,
        selectUF.current!,
        selectMunicipio.current!,
        selectDivisao.current!,
        selectAno.current!,
        selectSexo.current!,
        btnMenuAdultoToggle.current!,
        menuAdultoContainer.current!,
        valorHomensEl.current!,
        valorMulheresEl.current!,
        valorTodosEl.current!,
        mapeamentoContainer.current!
      );
    };
  const debouncedResizeMapeamento = debounce(handleResize, 120);

  const handleResizeRegional = () => {
    if (regionalContainer.current) {
      const host = regionalContainer.current as unknown as Record<string, unknown>;
      const resizeFn = host[REGIONAL_RESIZE_PROP];
      if (typeof resizeFn === "function") {
        (resizeFn as () => void)();
      }
    }
  };

  const handleResizeTemporal = () => {
    if (temporalContainer.current) {
      const host = temporalContainer.current as unknown as Record<string, unknown>;
      const resizeFn = host[TEMPORAL_RESIZE_PROP];
      if (typeof resizeFn === "function") {
        (resizeFn as () => void)();
      }
    }
  };

  // Listener único de window para os três gráficos
  const handleResizeAll = () => {
    // mantém o mesmo comportamento: mapeamento com debounce, demais imediatos
    debouncedResizeMapeamento();
    handleResizeRegional();
    handleResizeTemporal();
  };
    // Inicializa o gráfico de Mapeamento
    if (
      mapeamentoContainer.current &&
      selectUF.current &&
      selectMunicipio.current &&
      selectDivisao.current &&
      labelMunReg.current &&
      selectAno.current &&
      selectSexo.current &&
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
        labelMunReg.current,
        selectDivisao.current,
        labelDiv.current,
        selectAno.current,
        selectSexo.current,
        titleMap.current,
        btnMenuAdultoToggle.current,
        menuAdultoContainer.current,
        valorHomensEl.current,
        valorMulheresEl.current,
        valorTodosEl.current,
        adultoCols
      );
      
      window.addEventListener("resize", debouncedResizeMapeamento);
            
    }

    // Inicializa o gráfico Regional
    if (
      regionalContainer.current &&
      selectAnoReg.current &&
      selectSexoReg.current &&
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
        selectNutricional.current,
        selectModoReg.current,
        containerDivSelection,
        titleReg.current,
        valorMulheresElReg.current,
        valorHomensElReg.current,
        valorTodosElReg.current
      );
      window.addEventListener("resize", handleResizeRegional);
    }

    // Inicializa o gráfico Temporal
    if (
      temporalContainer.current &&
      selectUFTemp.current &&
      selectMunicipioTemp.current &&
      selectSexoTemp.current &&
      selectIndicadorTemp.current &&
      selectModoTemp.current &&
      labelMunicipioTemp.current &&
      labelSubdivTemp.current &&
      titleTemp.current &&
      valorHomensElTemp.current &&
      valorMulheresElTemp.current &&
      valorTodosElTemp.current
    ) {
      initTemporal(
        temporalContainer.current,
        selectUFTemp.current,
        selectMunicipioTemp.current,
        selectSexoTemp.current,
        selectIndicadorTemp.current,
        selectModoTemp.current,
        labelMunicipioTemp.current,
        labelSubdivTemp.current,
        titleTemp.current,
        valorHomensElTemp.current,
        valorMulheresElTemp.current,
        valorTodosElTemp.current
      );
      window.addEventListener("resize", handleResizeAll);
    }
    // Cleanup: remove o listener quando desmontar
    return () => {
      window.removeEventListener("resize", handleResizeAll);
    };
  }, [data, regions]);
  
  return (
        
    <div className="min-h-screen py-16">
      
      <div id="regional-tooltip" className="tooltip-regional hidden"></div>

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

        {/* Data Visualization Tabs */}
        <Tabs defaultValue="mapeamento" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mapeamento" className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Mapeamento Nutricional
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center gap-2">
              <GiBrazil className="h-5 w-5" />
              Mapeamento Demográfico
            </TabsTrigger>
            <TabsTrigger value="temporal" className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Análises Temporais
            </TabsTrigger>
          </TabsList>

          {/* Mapeamento do Estado Nutricional */}
          <TabsContent forceMount value="mapeamento" className="data-[state=inactive]:hidden data-[state=active]:block">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 ref={titleMap} className="text-2xl font-bold mb-3 text-foreground">
                    Mapeamento do Estado Nutricional
                  </h2>
                  <p className="text-muted-foreground">
                    Visualização em barras de todos os estados nutricionais das diversas regiões do Brasil, 
                    permitindo identificar a distribuição da população nos estados nutricionais
                    e áreas que requerem atenção especial.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-2 w-full flex gap-6">
                  <div className="w-1/5 flex  flex-col gap-6">
                    <div className="bg-white p-4 rounded-md shadow-md h-[28rem] text-sm">
                      <label htmlFor="selectUF" className="block font-semibold mt-2 text-base">Unidade Federativa</label>
                      <select id="selectUF" ref={selectUF} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione a UF</option>
                      </select>

                      <label htmlFor="selectMunicipio" ref={labelMunReg} className="block font-semibold mt-2 text-base hidden">Municípios</label>
                      <select id="selectMunicipio" ref={selectMunicipio} className="mt-1 border border-gray-300 rounded p-1 w-full hidden">
                        <option value="">Municípios</option>
                      </select>

                      
                      <label htmlFor="selectDivisao" ref={labelDiv} className="block font-semibold mt-2 text-base hidden">Divisão</label>
                      <select id="selectDivisao" ref={selectDivisao} className="mt-1 border border-gray-300 rounded p-1 w-full hidden">
                        <option value="">Divisão</option>                        
                      </select>

                      <label htmlFor="selectAno" className="block font-semibold mt-2 text-base">Ano</label>
                      <select id="selectAno" ref={selectAno} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o ano</option>
                      </select>

                      <label htmlFor="selectSexo" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select ref={selectSexo} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o gênero</option>
                      </select>
                    </div>

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-primary mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosEl}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-secondary mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresEl}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-accent mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensEl}>0</span>
                        </li>
                      </ul>
                    </div>
                                       
                  </div>
                  {/* coluna direita = gráfico + botão */}
                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md flex relative overflow-auto h-[38.5rem]">

                    {/*espaço para o gráfico*/}
                    <div id='graficoMapeamento' ref={mapeamentoContainer} className="flex-1 mx-auto min-w-[600px] min-h-[550px] relative" />

                    {/*botão de adulto + checkboxes*/}
                    <button ref={btnMenuAdultoToggle} 
                    className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded">	<CheckSquare2 className="h-5 w-5" /></button>
                    
                    <div ref={menuAdultoContainer}  id="menuAdultoContainer" 
                    className="absolute top-12 right-2 bg-muted p-2 shadow-lg rounded-md hidden">
                      <h2 className="font-bold mb-2 border p-2 border-2 rounded-wlg text-white bg-primary">Estado Nutricional</h2>

                      <div ref={adultoColsRef} className="space-y-1 flex flex-col">
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="baixo_peso" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Baixo Peso</span>
                        </label>
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="eutrofico" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Eutrófico</span>
                        </label>
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="sobrepeso" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Sobrepeso</span>
                        </label>
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="obesidade_G_1" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Obesidade I</span>
                        </label>
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="obesidade_G_2" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Obesidade II</span>
                        </label>
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="obesidade_G_3" className="accent-red-700" defaultChecked={true} />
                          <span className="ml-1 text-red-700" >Obesidade III</span>
                        </label>

                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="excesso_peso" className="accent-red-700" defaultChecked={false} />
                          <span className="ml-1 text-red-700" >Excesso de Peso</span>
                        </label>
                        
                        {/*<!-- Obesidade (soma de obesidade_G_1 + obesidade_G_2 + obesidade_G_3) -->*/}
                        <label className="p-1">
                          <input type="checkbox" name="adultoCols" value="obesidade_calc" className="accent-red-700" defaultChecked={false} />
                          <span className="ml-1 text-red-700" >Obesidade</span>
                        </label>
                      </div>
                    </div>                    

                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Diferença na quantidade de entrevistados</h4>
                    <p className="text-sm text-muted-foreground">
                      Há muito mais adultos femininos que masculinos presentes nos dados, com mais de 50 vezes mais nos anos iniciais e até 3 vezes nos anos mais recentes
                    </p>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Proporções semelhantes</h4>
                    <p className="text-sm text-secondary/80">
                      Apesar da grande diferença na quantidade de entrevistados, ambos os gêneros possuem proporções similares dos indicativos
                    </p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">Mudança de moda</h4>
                    <p className="text-sm text-accent/70">
                      Entre 2018 e 2020 há uma mudança no valor mais frenquente de Eutrófico para Sobrepeso 
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
                    Mapa demográfico de cada estado nutricional no Brasil, com visualização de suas diversas regiões e divisões. 
                    Nele é possível notar padrões e características específicas de cada região.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-2 w-full flex gap-6">
                  <div className="w-1/5 flex  flex-col gap-6">
                    <div className="bg-white p-4 rounded-md shadow-md h-[28rem] text-sm">
                  {/* Filtros Regionais */}
                      <label htmlFor="filtro-ano" className="block font-semibold mt-2 text-base">Ano</label>
                      <select id="filtro-ano" ref={selectAnoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Ano</option>
                      </select>

                      <label htmlFor="filtro-sexo" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select id="filtro-sexo" ref={selectSexoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Gênero</option>
                      </select>
                      
                      <label htmlFor="filtroNutricional" className="block font-semibold mt-2 text-base">Estado Nutricional</label>
                      <select id="filtroNutricional" ref={selectNutricional} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Estado nutricional</option>
                      </select>

                      <div className="containerDiv hidden" ref={containerDivisaoReg}>
                        <label htmlFor="filtro-divisao" className="block font-semibold mt-2 text-base">Divisão</label>
                        <select id="filtro-divisao" ref={selectModoReg} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Divisão</option>                          
                        </select>
                      </div>
                    </div>            

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-primary mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosElReg}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-secondary mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresElReg}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-accent mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensElReg}>0</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md flex relative overflow-auto h-[38.5rem]">
                    <div className="flex-1 min-w-[600px] min-h-[350px] relative">
                      <div id="mapaRegional" ref={regionalContainer} className="h-full w-full" />
                    </div>
                    <div id="legendRegional" className="legendRegional ml-4 self-center" />
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Norte</h4>
                    <p className="text-xs text-background">Maiores prevalências de Sobrepeso</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Nordeste</h4>
                    <p className="text-xs text-background">Maiores prevalências de Baixo Peso</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Centro-Oeste</h4>
                    <p className="text-xs text-background">Prevalência mediana na maioria dos indicadores</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Sudeste</h4>
                    <p className="text-xs text-background">Prevalência mediana em todos os indicadores</p>
                  </div>
                  <div className="bg-gradient-accent p-4 rounded-lg text-center">
                    <h4 className="font-bold text-primary mb-1">Sul</h4>
                    <p className="text-xs text-background">Maiores prevalências de Obesidade</p>
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
                      </select>

                      
                      <label htmlFor="filtro-muni" ref={labelMunicipioTemp} className="block font-semibold mt-2 text-base">Município</label>
                      <select id="filtro-muni" ref={selectMunicipioTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                      <option value="">Selecione o Município</option>
                      </select>

                      <label htmlFor="filtro-modoTemp" ref={labelSubdivTemp} className="block font-semibold mt-2 text-base">Divisão</label>
                      <select id="filtro-modoTemp"ref={selectModoTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                      <option value="">Selecione a Divisão</option>
                      </select>

                      <label htmlFor="filtroSexoTemp" className="block font-semibold mt-2 text-base">Gênero</label>
                      <select id="filtroSexoTemp" ref={selectSexoTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o Gênero</option>
                      </select>

                      <label htmlFor="filtroNutriTemp" className="block font-semibold mt-2 text-base">Estado Nutricional</label>
                      <select id="filtroNutriTemp" ref={selectIndicadorTemp} className="mt-1 border border-gray-300 rounded p-1 w-full">
                        <option value="">Selecione o Estado Nutricional</option>
                      </select>
                    </div>

                    {/* quadro de entrevistados */}
                    <div className="card bg-white gap-2 p-4 rounded-md shadow-md h-[9rem]">
                      <h4 className="font-semibold mb-3 text-foreground">Entrevistados</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2 ">
                          <div className="h-3 w-3 rounded-[30%] bg-primary mt-1"></div>
                          <span>Todos:</span>
                          <span ref={valorTodosElTemp}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-secondary mt-1"></div>
                          <span>Feminino:</span>
                          <span ref={valorMulheresElTemp}>0</span>
                        </li>
                        <li className="flex items-start space-x-2 text-muted-foreground">
                          <div className="h-3 w-3 rounded-[30%] bg-accent mt-1"></div>
                          <span>Masculino:</span>
                          <span ref={valorHomensElTemp}>0</span>
                        </li>
                      </ul>
                    </div>    
                  </div>

                  <div className="w-4/5 bg-white p-4 rounded-md shadow-md flex relative overflow-auto h-[38.5rem]">
                    <div id="temporalContainer" ref={temporalContainer} className="flex-1 mx-auto min-w-[600px] min-h-[350px] relative" />
                  </div>
                  
                
                </div>

                
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        
      </div>
    </div>
  );
}