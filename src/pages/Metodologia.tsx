import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BarChart3, TrendingUp } from "lucide-react";
import { GiBrazil } from "react-icons/gi";
const legend = [
  { imc: "< 18,5", label: "Baixo peso" },
  { imc: "18,5 ≤ 24,9", label: "Eutrofia" },
  { imc: "25,0 ≤ 29,9", label: "Sobrepeso" },
  { imc: "30,0 ≤ 34,9", label: "Obesidade grau I" },
  { imc: "35,0 ≤ 39,9", label: "Obesidade grau II" },
  { imc: "40,0 >", label: "Obesidade grau III" },
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
                Os dados vêm do SISVAN e das Regiões de Saúde de 2019, permitindo análises entre 2008 e 2024 sobre o estado nutricional de adultos. As visualizações — Mapeamento Nutricional, Demográfico e Análise Temporal — mostram como o Brasil evolui em diferentes recortes. A metodologia garante comparabilidade ao longo dos anos, transformando informações em insumos para decisões em saúde pública.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Data */}
        <section className="mb-8">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white ">
                Nossos Dados
              </h2>
            </CardContent>
          </Card>
          <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
          Todas as análises e construções desenvolvidas aqui se baseiam nos dados coletados e disponibilizados 
          pelo SISVAN
          <sup id="cite-sisvan">
            <a href="#ref-sisvan" aria-label="Ir para referência 1">[1]</a>
          </sup>
          , além de contar com as divisões de regiões de saúde de 2019 criadas a partir dos
          dados do IBGE e DATASUS
          <sup id="cite-shape">
            <a href="#ref-shape" aria-label="Ir para referência 2">[2]</a>
          </sup>.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
            Os percentuais de “prevalência” são calculados como <span className="font-semibold">(contagem do indicador ÷ total no recorte) × 100</span>.
            A mesma base alimenta três visões — Temporal, Mapeamento e Regional — variando o tipo de agregação, o denominador e a escala geográfica.
          </p>
          <div>
                
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  O que é o SISVAN?
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-2 md:text-justify">
                  O Sistema de Vigilância Alimentar e Nutricional (SISVAN) é uma ferramenta fundamental 
                  para o monitoramento do estado nutricional da população brasileira, fornecendo dados 
                  essenciais para o desenvolvimento de políticas públicas de saúde.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                  Através de uma {''}<span className="font-semibold">coleta sistemática de dados antropométricos e de consumo alimentar</span>{''}, 
                  o SISVAN permite identificar tendências, padrões regionais e grupos de risco, 
                  orientando intervenções em saúde pública.
                </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start mt-4">
              
              <div>
                
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Abrangência dos Dados
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Nosso sistema permite explorar cada estado nutricional da classificação antropométrica 
                  para <span className="text-secondary font-semibold">adultos (20-59 anos)</span> a partir dos seguintes fatores:
                </p>
                 
                <ul className="list-none space-y-2 text-lg text-muted-foreground text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Unidades geográficas:</span>{''} País, Estados, Cidades e Regiões de Saúde;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-secondary"
                    />{''}<span className="text-secondary font-semibold">Gênero:</span>{''} Feminino e Masculino;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />{''}<span className="text-accent font-semibold">Período:</span>{''} 2008 a 2024.
                  </li>
                </ul>
                
                <br></br>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                  Essa estrutura facilita análises comparativas e permite {''}<span className="font-semibold">identificar tendências, vulnerabilidades regionais e perfis nutricionais específicos</span>{''} 
                  , fundamentais para a formulação de políticas de saúde pública baseadas em evidências. 
                  Exemplos de análise disponíveis:
                </p>
                <br></br>
                <ul className="list-none space-y-2 text-lg text-muted-foreground text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-secondary"
                    />
                    Comparação da prevalência de {''} 
                    <span className="text-secondary font-semibold"> obesidade entre mulheres adultas </span>{''} 
                     em diferentes estados (ex: Minas Gerais vs. São Paulo);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-accent"
                    />
                    Avaliação da {''} 
                    <span className="text-accent font-semibold">evolução da desnutrição da população geral </span>{''}
                    em uma mesma região ao longo dos anos;
                  </li>
                </ul>


              </div>
              
              
              <Card className="shadow-strong">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-6 text-primary">
                    Classificação Antropométrica
                  </h4>
                  <p className="text-muted-foreground md:text-justify"> Utilizamos critérios padronizados com base no Índice de Massa Corporal (IMC), ajustados conforme a fase da vida. Abaixo, apresentamos os pontos de corte adotados e a fórmula do IMC:</p>
                  <br></br>
                  <div className="col-span-2 text-center text-muted-foreground">
                    <math display="block">
                      <mrow>
                        <mi>IMC</mi>
                        <mo>=</mo>
                        <mfrac>
                          <mrow>
                            <mi>Peso (kg)</mi>
                          </mrow>
                          <mrow>
                            <mi>Altura² (m²)</mi>
                          </mrow>
                        </mfrac>
                      </mrow>
                    </math>
                    {/* em JSX o <br> precisa ser self-closed */}
                    <br />
                  </div>
                  <div className="overflow-x-auto">
                    <p className="font-bold md:text-center"> Adultos (20-59 anos)</p>
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted-foreground/5">
                        <tr>
                          <th className="px-4 py-2 text-center">IMC (kg/m²)</th>
                          <th className="px-4 py-2 text-center">Estado Nutricional</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {legend.map(({ imc, label }) => (
                          <tr key={label}>
                            <td className="px-4 py-2 text-muted-foreground text-center">{imc}</td>
                            <td className="px-4 py-2 text-muted-foreground text-center">{label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                </CardContent>
              </Card>
              
            </div>
            <div>
                
                <h3 className="text-2xl font-semibold mb-4 text-foreground mt-8">
                  Por que isso importa?
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Os dados apresentados aqui são uma ferramenta estratégica para o 
                  <span className="text-secondary font-semibold"> monitoramento contínuo </span> da situação 
                  nutricional no território nacional, <span className="text-accent font-semibold">avaliação de impacto</span>{' '}
                  de políticas públicas e <span className="text-secondary font-semibold">planejamento de ações locais</span>{''}, como campanhas de prevenção à obesidade.
                </p>
                <p className="text-xl text-muted-foreground max-w-1xl mx-auto italic text-center">Transformando dados em ação</p>
                <p className="text-xl text-muted-foreground max-w-1xl mx-auto italic text-center">
                  Use nosso mapeamento como base técnica para decisões mais eficazes em saúde pública
                </p>
              </div>
        </section>

        {/* Visualization */}
        <section className="mb-12" id="como-calculamos">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white">Nossas Visualizações</h2>
            </CardContent>
          </Card>

          {/* Comum */}
          <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-6">
            O fluxo começa pela escolha do recorte, que define o universo do cálculo: UF → (Município ou Região de Saúde) → Ano → Gênero. Em qualquer módulo, a opção
            <span className="font-semibold"> “Todos”</span> é a soma de Feminino + Masculino. Percentuais são arredondados na interface,
            mas os cálculos preservam precisão para evitar distorções por arredondamento acumulado.
            Cada visualização define uma ou duas dessas variáveis do recorte como "constante" enquanto compara as outras naquele universo.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start mt-4">

            {/* Mapeamento */}
            <div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Mapeamento Nutricional</h3>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
              A pergunta aqui é “<span className="text-accent font-semibold"><em>como se reparte o todo entre os estados nutricionais marcados</em>?</span>”. 
              Para cada selecionado, pegamos o recorte e em seguida calculamos a soma de todas 
              as parcelas dos estados nutricionais marcados gerando um Total<sub>group</sub>.
              Cada barra representa a fração do estado nutricional sobre esse Total<sub>group</sub>, ou seja, 
              uma distribuição interna condicionada ao conjunto escolhido.
              A visualização mostra barras agrupadas (Masculino, Feminino, Todos) e uma <span className="font-semibold">barra empilhada</span> (Masculino+Feminino) para evidenciar a 
              composição por gênero na visualização <i>Todos</i>.
            </p>
            
            {/* Callout 1 */}
            <div className="rounded-xl border border-accent bg-accent/20 p-4 mb-2">
              <p className="text-lg text-yellow-800 md:text-justify ">
                <span className="font-semibold">Denominador variável:</span> é uma distribuição <em>interna</em> aos estados nutricionais marcados.
                Marcar/desmarcar categorias muda o <em>Total<sub>rec</sub></em> e todas as porcentagens. Não compare diretamente com prevalências da Análise Temporal
                ou Mapeamento Demográfico.
              </p>
            </div>
            </div>
            <div>
            {/* Regional */}
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Mapeamento Demográfico</h3>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
              A unidade básica nesta visualização é o município. Atribuímos cada município à sua região na visualização atual, somamos o numerador do estado nutricional e o total por região, calculando
              <div className="col-span-2 text-center text-muted-foreground mt-6 mb-6">
                    <math display="block">
                      <mrow>
                        <mi>prevalência regional (%)</mi>
                        <mo>=</mo>
                        <mfrac>
                          <msub>
                            <mi>Total</mi>
                            <mn>nutri</mn>
                          </msub>
                          <mrow>
                            <mi>Total</mi>
                          </mrow>
                        </mfrac>
                        <mo> &times; </mo>
                        <mn>100 %.</mn>
                      </mrow>
                    </math>
                    {/* em JSX o <br> precisa ser self-closed */}
                    <br />
                  </div>
               Além disso, usamos escala de cores <span className="font-semibold">quantizada</span> para faixas e 
              legenda textual dos intervalos, enquanto regiões sem valores (total = 0) aparecem
              em cinza.
            </p>
            
            {/* Callout 2 */}
            <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 mb-4">
              <p className="text-lg text-blue-900 md:text-justify">
                <span className="font-semibold">MAUP/escala geográfica:</span> prevalências por Região de Saúde são agregações de municípios.
                Evite inferir comportamento municipal ou individual a partir do mapa (“falácia ecológica”).
              </p>
            </div>
          </div>
          </div>
          
          {/* Callout 3 */}
          <div className="rounded-xl border border-secondary bg-secondary/20 p-4 mb">
              <p className="text-lg text-red-800 md:text-justify">
                <span className="font-semibold">Malha de Regiões de Saúde fixada em 2019:</span>
                {" "}as análises espaciais utilizam a configuração de Regiões de Saúde vigente em 2019 como referência
                <span className="font-semibold"> fixa</span> para todos os anos exibidos. Essa escolha garante
                <span className="font-semibold"> comparabilidade temporal</span>. Em anos em que o SUS tenha alterado a composição regional,
                os resultados <span className="font-semibold">não representam a malha administrativa daquele ano</span>, mas a
                projeção dos dados na malha 2019. Variações ao longo do tempo refletem mudanças nos indicadores,
                <span className="font-semibold"> não</span> mudanças de desenho regional.
              </p>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start mt-4">

            {/* Temporal */}
            <div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Análises Temporais</h3>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
              Seleciona-se um estado nutricional e calcula-se sua <span className="font-semibold">prevalência por ano</span> no recorte. Para cada ano, somamos o numerador daquele estado nutricional
              e o total; então tomamos a razão deles (× 100) para obter o valor exibido. O eixo X usa anos ordenados e o eixo Y é percentual, com teto ajustado ao máximo observado
              (com margem). Mostramos linhas por gênero (quando aplicável) e pontos com rótulos do valor daquele ano.
            </p>
            </div>
            <div>
            <Card className="shadow-strong">
                <CardContent className="p-8">
                  
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted-foreground/5">
                        <tr>
                          <th className="px-4 py-2 text-center">Visualização</th>
                          <th className="px-20 py-2 text-center">Recorte</th>
                          <th className="px-4 py-2 text-center">Compare</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {visualize.map(({ symbol, viz, show, compare }) => (
                          <tr key={viz}>
                            <td className="flex px-4 py-2 text-muted-foreground text-start items-center">{symbol} {viz}</td>
                            <td className="px-4 py-2 text-muted-foreground text-center">{show}</td>
                            <td className="px-4 py-2 text-muted-foreground text-center">{compare}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  
              </CardContent>
            </Card>
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
           <ol className="list-decimal pl-5 text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
            <li id="ref-sisvan" className="scroll-mt-24">
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="https://sisaps.saude.gov.br/sisvan/relatoriopublico/index">
             Relatórios de Acesso Público. Site Oficial do Sistema de Vigilância Alimentar e Nutricional (SISVAN).
          <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
              <a href="#cite-sisvan" className="ml-2 text-xs underline hover:no-underline hover:text-sm hover:text-secondary/80">↩ voltar</a>
            </li>

            <li id="ref-shape" className="scroll-mt-24">
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="https://github.com/lansaviniec/shapefile_das_regionais_de_saude_sus">
             SAVINIEC, Landir; ROCHA, Alexsandra Bezerra da. Shape das Regiões de Saúde do Brasil. 13 de jul. de 2020.
          <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
              <a href="#cite-shape" className="ml-2 text-xs underline hover:no-underline hover:text-sm hover:text-secondary/80">↩ voltar</a>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Metodologia;