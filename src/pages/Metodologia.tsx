import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BarChart3, TrendingUp, TriangleAlert } from "lucide-react";
import { GiBrazil } from "react-icons/gi";
const legend = [
  { imc: "< 18,5", label: "Baixo peso" },
  { imc: "≥ 18,5 e < 25,0", label: "Eutrofia" },
  { imc: "≥ 25,0 e < 30,0", label: "Sobrepeso" },
  { imc: "≥ 30,0 e < 35,0", label: "Obesidade grau I" },
  { imc: "≥ 35,0 e < 40,0", label: "Obesidade grau II" },
  { imc: "≥ 40,0", label: "Obesidade grau III" },
];

const visualize = [
  {symbol:<BarChart3 className="mr-1 h-8 w-8 self-center" aria-hidden />, viz: "Mapeamento Nutricional", show:"Região x Anos", compare:"Estados Nutricionais"},
  {symbol:<GiBrazil className="mr-1 h-8 w-8 self-center" />, viz:"Mapeamento Demográfico", show:"Estado Nutricional x Anos", compare:"Regiões"},
  {symbol:<TrendingUp className="mr-1 h-6 w-6 self-center" />, viz:"Análise Temporal", show:"Estado Nutricional x Região", compare:"Anos"},
]

const Metodologia = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Metodologia
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bastidores das visualizações: de onde vêm os dados, como tratamos e por que mostramos assim.
          </p>
        </div>

        {/* TL;DR */}
        <section className="mb-8">
          <Card className="shadow-medium bg-muted/50">
            <CardContent className="p-6 md:p-4">
              <p className="text-lg text-muted-foreground md:text-justify">
                Compreender a evolução do estado nutricional da população brasileira para apoiar a tomada de
                decisão em saúde pública: este é o foco desta plataforma. Abaixo, detalhamos a origem e o 
                tratamento aplicado aos dados, garantindo que profissionais e gestores possam utilizar estes 
                indicadores com segurança para o monitoramento do cenário nacional.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* SISVAN */}
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                O Sistema de Vigilância Alimentar e Nutricional (SISVAN)
              </h2>
            </CardContent>
          </Card>
          <div className="mr-10 ml-4">
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          O SISVAN é o sistema de informação do Ministério da Saúde responsável pelo monitoramento contínuo 
          do estado nutricional e do consumo alimentar da população assistida pelo Sistema Único de Saúde 
          (SUS)<a href="#ref-sisvan" className="hover:text-secondary/50" aria-label="Ir para referência 1">[1]</a>.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          Ele opera no âmbito da <span className="text-secondary/90">Atenção Primária à Saúde (APS)</span>, consolidando dados antropométricos coletados
          durante os atendimentos de rotina. Mais do que um repositório, o SISVAN é uma ferramenta essencial 
          para a gestão, fornecendo subsídios para o planejamento, acompanhamento e avaliação de políticas 
          públicas de alimentação e nutrição<a href="#ref-aps" className="hover:text-secondary/50" aria-label="Ir para referência 2">[2]</a>.
          </p>
          </div>
        </section>
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                Origem e Características dos Dados
              </h2>
            </CardContent>
          </Card>
          <div className=" ml-4 mr-10 ">
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          As informações aqui apresentadas são provenientes dos relatórios consolidados de acesso público do 
          <span className="text-secondary/90"> SISVAN Web</span>, compreendendo dados temporais de 
          <span className="text-secondary/90"> 2008 a 2024</span>
          <a href="#ref-sisvan" className="hover:text-secondary/50" aria-label="Ir para referência 1">[1]</a>.
          </p>

              
              <div>
                
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Natureza da Amostra
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  É fundamental compreender a distinção metodológica entre os dados apresentados e
                  os inquéritos populacionais:
                </p>
                 
                <ul className="list-none space-y-2 text-lg text-muted-foreground ml-6 text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Inquéritos de Base Populacional (ex: Censo, POF, PNS):</span>{''} Utilizam 
                    amostragem probabilística para representar a totalidade da população brasileira, independentemente do uso
                     de serviços de saúde;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Dados Administrativos (SISVAN):</span>{''} Refletem 
                    o perfil nutricional dos <span className="text-secondary/90">indivíduos que buscaram atendimento na rede pública de saúde</span><a href="#ref-aps" className="hover:text-secondary/50" aria-label="Ir para referência 2">[2]</a>.
                  </li>
                </ul>
                
                <br></br>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                  Portanto, os indicadores desta plataforma referem-se à <span className="text-secondary/90"> população usuária do 
                  SUS</span> monitorada no período. Embora não possuam inferência universal para toda a demografia brasileira,
                  representam o cenário da demanda nos serviços de saúde, constituindo uma evidência sólida para a gestão do sistema.
                </p>
                <br></br>
              </div>

              <div>
                
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Níveis de Agregação Geográfica
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Para permitir diagnósticos em diferentes escalas, 
                  os dados foram estruturados nos seguintes níveis territoriais:
                </p>
                 
                <ul className="list-none space-y-2 text-lg text-muted-foreground ml-6 text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Nacional:</span>{''} Brasil;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-secondary"
                    />{''}<span className="text-secondary font-semibold">Estadual:</span>{''} Unidades da Federação (UF);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Regional:</span>{''} Macrorregiões de Saúde e Regiões de Saúde (conforme divisão administrativa do SUS);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-secondary"
                    />{''}<span className="text-secondary font-semibold">Local:</span>{''} Municípios.
                  </li>
                </ul>
                
                <br></br>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                  Portanto, os indicadores desta plataforma referem-se à <span className="text-secondary/90"> população usuária do 
                  SUS</span> monitorada no período. Embora não possuam inferência universal para toda a demografia brasileira,
                  representam o cenário da demanda nos serviços de saúde, constituindo uma evidência sólida para a gestão do sistema.
                </p>
                <br></br>
              </div>
              </div>
        </section>
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                Harmonização Territorial
              </h2>
            </CardContent>
          </Card>
          <div className=" ml-4 mr-10 ">
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          Para garantir a consistência dos dados temporais, 
          aplicou-se uma metodologia de compatibilização geográfica.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          Utilizou-se como base fixa a malha de<span className="text-secondary/90"> Regiões e Macrorregiões de Saúde vigente em 2024/2025</span> (fontes:
          DEMAS-SEIDIGI e IBGE<a href="#ref-macro" className="hover:text-secondary/50" aria-label="Ir para referência 3">[3]</a><a href="#ref-ibge" className="hover:text-secondary/50" aria-label="Ir para referência 4">[4]</a>). 
          Os dados dos anos anteriores foram projetados sobre esta configuração atual. 
          Isso assegura que as variações observadas ao longo do tempo reflitam mudanças reais nos indicadores de 
          saúde daquele território, sem a interferência de alterações administrativas nas divisas regionais 
          ocorridas na última década.
          </p>
          </div>

          </section>
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                Classificação Antropométrica e Indicadores
              </h2>
            </CardContent>
          </Card>
          <div className=" ml-4 mr-10 ">
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          O estado nutricional para adultos (20 a 59 anos) segue os pontos de corte de Índice de Massa Corporal (IMC)
          preconizados pela Organização Mundial da Saúde (OMS) e adotados pelo Ministério da Saúde 
          <a href="#ref-aps" className="hover:text-secondary/50" aria-label="Ir para referência 2">[2]</a>:
          </p>

          <Card className="shadow-strong max-w-fit bg-muted-foreground/5 place-self-center">
            <CardContent className="p-2">
              <div className="place-items-center">  
                <table className="min-w-4xl text-sm text-left">
                  <thead className="bg-muted-foreground/30">
                    <tr className="text-center text-base">
                      <th className="px-4 py-2">Classificação</th>
                      <th className="px-4 py-2">Intervalo de IMC (kg/m²)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {legend.map(({ imc, label }) => (
                      <tr key={label}>                  
                        <td className="px-4 py-2 text-muted-foreground text-left">{label}</td>
                        <td className="px-4 py-2 text-muted-foreground text-center">{imc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

            <div>             
                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-8">
                  Agrupamentos para Visualização
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Para facilitar a leitura epidemiológica e a identificação de riscos nas visualizações, 
                  foram utilizados também dois indicadores agregados:
                </p>
                <ul className="list-none space-y-2 text-lg text-muted-foreground ml-6 text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-secondary"
                    />{''}<span className="text-secondary font-semibold">Excesso de Peso:</span>{''} Agrega 
                    todos os indivíduos com IMC ≥ 25,0 kg/m² (soma de <span className="italic">Sobrepeso</span> + <span className="italic">Obesidade Graus I, II</span> e <span className="italic">III</span>);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Obesidade (Geral):</span>{''} Agrega 
                    todos os indivíduos com IMC ≥ 30,0 kg/m² (soma de <span className="italic">Obesidade Graus I, II</span> e <span className="italic">III</span>);
                  </li>
                </ul>
              </div>
          </div>
        </section>
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                Cálculo de Indicadores
              </h2>
            </CardContent>
          </Card>
          <div className=" ml-4 mr-10 ">

          {/* Comum */}
          <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-6">
            Para transformar os dados em informações comparáveis, utilizamos a <span className="text-secondary/90">Prevalência</span> (frequência relativa). 
            Diferente do número absoluto, a prevalência permite comparar municípios e regiões de tamanhos 
            populacionais diferentes [6] 
          </p>

            {/* Mapeamento */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">A Fórmula da Prevalência</h3>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                O percentual exibido nos gráficos e mapas representa a proporção de indivíduos em uma determinada 
                condição em relação ao total de pessoas avaliadas naquele grupo específico:
              </p>
              <br />
              <div className="col-span-2 text-center text-muted-foreground">
                <math display="block">
                  <mrow>
                    <mi>Prevalência (%)</mi>
                    <mo>=</mo>
                    <mfrac>
                      <mrow>
                        <mi>Nº de individuos na classificação</mi>
                      </mrow>
                      <mrow>
                        <mi>Total de indivíduos avaliados (no ano, sexo e local selecionados)</mi>
                      </mrow>
                    </mfrac>
                    <mo>&times; 100</mo>
                  </mrow>
                </math>
                {/* em JSX o <br> precisa ser self-closed */}
                <br />
              </div>
              
            </div>

            {/* Regional / Demográfico */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Representação dos Dados</h3>
              <h4 className="text-xl font-semibold mb-4 text-secondary/80">Mapeamento Demográfico</h4>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                Apresenta a distribuição espacial das prevalências.
              </p>
              <ul className="list-none space-y-2 text-lg text-muted-foreground ml-6 text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Nota Técnica: </span>{''}                   
                  Municípios representados na cor cinza indicam ausência de dados ou número insuficiente de registros no 
                  sistema para o ano selecionado, não devendo ser interpretados como prevalência zero. A cartografia 
                  utiliza como base os arquivos shapefile do projeto Geodata BR
                  <a href="#ref-geodata" className="hover:text-secondary/50" aria-label="Ir para referência 2">[5]</a>.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-6 mb-4 text-secondary/80">Mapeamento Demográfico</h4>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                Exibe a evolução dos indicadores ao longo dos anos (2008-2024). 
                Esta visualização permite observar o comportamento histórico dos dados, 
                facilitando a identificação de tendências de aumento ou estabilização do estado nutricional 
                na região selecionada.
              </p>
            </div>

            
          </div>

          

          
        </section>




        {/* References */}
        <section className="mb-16">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white">
                Referências
              </h2>
            </CardContent>
          </Card>
           <ul className="list-none pl-5 text-lg leading-relaxed text-muted-foreground mb-6 mr-10 md:text-justify">

            <li id="ref-sisvan" className="scroll-mt-24 mb-4">
              
            [1] Brasil. Ministério da Saúde. 
            Secretaria de Atenção Primária à Saúde. 
            <span className="text-secondary/90"> Sistema de Vigilância Alimentar e Nutricional - SISVAN Web. </span>
             Relatórios de Acesso Público. 
            Disponível em:<a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="http://sisaps.saude.gov.br/sisvan/"><span className="underline">http://sisaps.saude.gov.br/sisvan</span>.

           <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
            </li>

            <li id="ref-aps" className="scroll-mt-24 mb-4">
             [2] Brasil. Ministério da Saúde. 
             Secretaria de Atenção à Saúde. 
             Departamento de Atenção Básica. 
             <span className="text-secondary/90"> Orientações para a coleta e análise de dados antropométricos em serviços de saúde: 
             Norma Técnica do Sistema de Vigilância Alimentar e Nutricional – SISVAN. </span>
             Brasília: Ministério da Saúde, 2011.
            </li>

            <li id="ref-macro" className="scroll-mt-24 mb-4">
              [3] Brasil. Ministério da Saúde. 
              Departamento de Monitoramento e Avaliação do SUS (DEMAS-SEIDIGI).  
              <span className="text-secondary/90"> Divisão Territorial de Saúde: Macrorregiões e Regiões de Saúde.
            </span>
            </li>

            <li id="ref-ibge" className="scroll-mt-24 mb-4">
              [4] Instituto Brasileiro de Geografia e Estatística (IBGE).   
              <span className="text-secondary/90"> Malha Municipal Digital.</span> Rio de Janeiro: IBGE.
            </li>

            <li id="ref-geodata" className="scroll-mt-24 mb-4">
              [5] BRUGNARA, Telmo.    
              <span className="text-secondary/90"> Geodata BR - Brasil.</span> Porto Alegre: Github, 2020.
              Disponível em:
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" 
              target="_blank" href="https://github.com/tbrugz/geodata-br"><span className="underline">https://github.com/tbrugz/geodata-br</span>.
              <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Metodologia;