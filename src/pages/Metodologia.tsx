import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BarChart3, TrendingUp, TriangleAlert } from "lucide-react";
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
                Os dados vêm do SISVAN e das Regiões de Saúde de 2024, permitindo análises entre 2008 e 2024 sobre o estado nutricional de adultos. As visualizações — Mapeamento Nutricional, Demográfico e Análise Temporal — mostram como o Brasil evolui em diferentes recortes. A metodologia garante comparabilidade ao longo dos anos, transformando informações em insumos para decisões em saúde pública.
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
          Todas as análises e construções desenvolvidas aqui se baseiam nos dados nutricionais coletados e disponibilizados 
          pelo SISVAN
          <sup id="cite-sisvan">
            <a href="#ref-sisvan" aria-label="Ir para referência 1">[1]</a>
          </sup>, 
          nas divisões de macrorregiões e regiões de saúde de 2024 criadas a partir dos
          dados do DEMAS-SEIDIGI
          <sup id="cite-macro">
            <a href="#ref-macro" aria-label="Ir para referência 2">[2]</a>
          </sup> e das malhas municipais disponibilizadas pelo IBGE
          <sup id="cite-shape">
            <a href="#ref-shape" aria-label="Ir para referência 3">[3]</a>
          </sup>
          <sup id="cite-ibge">
            <a href="#ref-ibge" aria-label="Ir para referência 4">[4]</a>
          </sup>.


          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
            Os percentuais de “prevalência” são calculados como <span className="font-semibold">(contagem do estado nutricional ÷ total no recorte) × 100</span>.
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
                    />{''}<span className="text-accent font-semibold">Unidades geográficas:</span>{''} País, Estados, Cidades, Macrorregiões e Regiões de Saúde;
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
        <section className="mb-8" id="como-calculamos">
          <Card className="shadow-medium bg-gradient-accent mb-4">
            <CardContent className="p-2 md:p-2 text-left">
              <h2 className="text-3xl font-bold text-white">Nossas Visualizações</h2>
            </CardContent>
          </Card>

          {/* Comum */}
          <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-6">
            O fluxo começa pela escolha do <span className="font-semibold">recorte</span>, que define o universo do cálculo:
            UF → (Município ou <span className="font-semibold">Macrorregião de Saúde</span> ou Região de Saúde) → Ano → Gênero.
            Em qualquer módulo, a opção <span className="font-semibold">“Todos”</span> é a soma de Feminino + Masculino.
            Percentuais são arredondados na interface, mas os cálculos preservam precisão para evitar distorções por arredondamento acumulado.
            Cada visualização fixa uma ou duas variáveis do recorte como “constantes” e compara as demais dentro desse mesmo universo.
            Foram criados os <span className="font-semibold">agrupamentos “Obesidade” e "Excesso de peso"</span>, sendo o agregado de todos os três graus de obesidade e
            o agregado de sobrepeso com os três graus de obesidade, respectivamente. Ambos disponíveis em todas três visões. 
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start mt-4">

            {/* Mapeamento */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Mapeamento Nutricional</h3>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                A pergunta aqui é “<span className="text-accent font-semibold"><em>como se reparte o todo entre os estados nutricionais marcados</em>?</span>”.
                Para cada selecionado, partimos do recorte e calculamos a soma das parcelas dos estados marcados, gerando um
                <em> Total</em><sub>group</sub>. Cada barra representa a fração de um estado nutricional sobre esse
                <em> Total</em><sub>group</sub> — uma distribuição <em>interna</em> condicionada ao conjunto escolhido.
                A visualização mostra barras agrupadas (Masculino, Feminino, Todos) e uma barra empilhada (Feminino sobre Masculino) para evidenciar a composição por gênero em <i>Todos</i>.
              </p>

              {/* Callout 1 */}
              <div className="rounded-xl border border-accent bg-accent/20 p-4 mb-2">
                <div className="text-lg text-yellow-800 md:text-justify ">
                  <p>
                  <TriangleAlert className="inline-block h-6 w-6 align-text-top" aria-hidden /> <span className="text-xl">Denominador variável</span>
                  </p>
                  <p> 
                    A distribuição é <em>interna</em> aos estados nutricionais marcados, ou seja, marcar/desmarcar categorias altera o denominador e, portanto, todas as porcentagens. Evite comparar diretamente com prevalências da Análise Temporal ou do Mapeamento Demográfico.
                  </p>
                </div>
              </div>
            </div>

            {/* Regional / Demográfico */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Mapeamento Demográfico</h3>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                A unidade básica é o município, associado à região do recorte vigente na visualização, seja Unidade Federativa,
                Região de Saúde ou <span className="font-semibold">Macrorregião de Saúde</span>. Para cada região,
                somamos tanto o numerador do estado nutricional quanto o seu total, e calculamos:
              </p>

              <div className="col-span-2 text-center text-muted-foreground mt-6 mb-6">
                <math display="block">
                  <mrow>
                    <mi>prevalência regional (%)</mi>
                    <mo>=</mo>
                    <mfrac>
                      <msub><mi>Total</mi><mn>nutri</mn></msub>
                      <mrow><mi>Total</mi></mrow>
                    </mfrac>
                    <mo>×</mo>
                    <mn>100 %.</mn>
                  </mrow>
                </math>
                <br />
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                Usamos escala de cores <span className="font-semibold">quantizada</span> com faixas e legenda textual;
                regiões sem valores (Total = 0) aparecem em cinza.
              </p>

              {/* Callout 2 */}
              <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 mt-4 mb-4">
                <div className="text-lg text-blue-900 md:text-justify">
                  <p><TriangleAlert className="inline-block h-6 w-6 align-text-top" aria-hidden /> <span className="text-xl">MAUP/escala geográfica</span></p> 
                  <p>Prevalências por Macrorregião ou Região de Saúde agregam municípios.
                  Evite inferir comportamento municipal ou individual a partir do mapa (“falácia ecológica”).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Callout 3 */}
          <div className="rounded-xl border border-secondary bg-secondary/20 p-4 mb">
            <p className="text-lg text-red-800 md:text-justify">
              <TriangleAlert className="inline-block h-6 w-6 align-text-top" aria-hidden /> <span className="text-xl">Malha de Regiões e Macrorregiões fixadas em 2025 </span></p>
            <p className="text-lg text-red-800 md:text-justify">
              As análises espaciais utilizam a configuração vigente em 2025 como referência
              <span className="font-semibold"> fixa</span> para todos os anos exibidos.
              Nos anos em que o SUS tenha alterado a composição regional, os resultados
              <span className="font-semibold"> não</span> representam a malha administrativa daquele ano,
              mas a projeção dos dados na malha 2025. Assim, variações ao longo do tempo refletem mudanças
              nos estados nutricionais, <span className="font-semibold">não</span> no desenho regional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start mt-4">

            {/* Temporal */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Análises Temporais</h3>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-justify mb-2">
                Seleciona-se um estado nutricional e calcula-se sua <span className="font-semibold">prevalência por ano</span> no recorte.
                Para cada ano, somamos o numerador do estado nutricional e o total; então tomamos a razão (× 100) para o valor exibido.
                O eixo X usa anos ordenados e o eixo Y é percentual, com teto ajustado ao máximo observado (com margem).
                Mostramos linhas por gênero (quando aplicável) e marcadores com rótulos do valor anual.
              </p>
            </div>

            {/* Tabela “o que cada visualização fixa/compare” */}
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
          <div className="rounded-xl border border-accent bg-accent/20 p-4 mt-4">
            <p className="text-lg text-yellow-800 md:text-justify">
              <TriangleAlert className="inline-block h-6 w-6 align-text-center" aria-hidden /> <span className="text-xl">Atenção para como ler valores por gênero!</span><br />
              • Quando Gênero = <span className="text-primary italic"> Todos</span>, os valores mostrados para Feminino e Masculino representam a
              <span className="font-semibold"> parcela interna</span> de cada gênero <em>dentro do total</em> “Todos” naquele ano (não são as prevalências em seus próprios denominadores).<br />
              • Quando Gênero = <span className="text-secondary italic">Feminino</span> ou Gênero = <span className="text-accent italic">Masculino</span>, os valores são
              <span className="font-semibold"> calculados a partir do total daquele gênero</span> no ano/recorte — portanto, podem diferir dos exibidos em “Todos”.
            </p>
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

            <li id="ref-macro" className="scroll-mt-24">
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="https://infoms.saude.gov.br/extensions/SEIDIGI_DEMAS_MACRORREGIOES/SEIDIGI_DEMAS_MACRORREGIOES.html">
             Ministério da Saúde - Macrorregiões e Regiões de Saúde. Desenvolvido pelo DEMAS-SEIDIGI.
          <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
              <a href="#cite-macro" className="ml-2 text-xs underline hover:no-underline hover:text-sm hover:text-secondary/80">↩ voltar</a>
            </li>

            <li id="ref-shape" className="scroll-mt-24">
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="https://github.com/tbrugz/geodata-br">
             Projeto Geodata BR - Brasil. Criado por Telmo Brugnara - github/tbrugz.
          <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
              <a href="#cite-shape" className="ml-2 text-xs underline hover:no-underline hover:text-sm hover:text-secondary/80">↩ voltar</a>
            </li>

            <li id="ref-ibge" className="scroll-mt-24">
              <a className="ml-2 text-muted-foreground hover:underline hover:text-secondary/50" target="_blank" href="https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/15774-malhas.html?=&t=downloads">
             Malha Municipal - Instituto Brasileiro de Geografia e Estatística (IBGE).
          <ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a>
              <a href="#cite-ibge" className="ml-2 text-xs underline hover:no-underline hover:text-sm hover:text-secondary/80">↩ voltar</a>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Metodologia;