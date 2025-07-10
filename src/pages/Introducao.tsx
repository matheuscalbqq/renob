import heroImage from "@/assets/nutrition-hero.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Globe, Users, Target } from "lucide-react";
const legend = [
  { imc: "< 18,5", label: "Baixo peso" },
  { imc: "18,5 ≤ 24,9", label: "Eutrofia" },
  { imc: "25,0 ≤ 29,9", label: "Sobrepeso" },
  { imc: "30,0 ≤ 34,9", label: "Obesidade grau I" },
  { imc: "35,0 ≤ 39,9", label: "Obesidade grau II" },
  { imc: "40,0 >", label: "Obesidade grau III" },
];

const Introducao = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              RENOB-MG
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Seja bem-vindo ao nosso site dedicado ao monitoramento do estado nutricional da população brasileira.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-lg leading-relaxed md:text-justify">
                Com base em dados oficiais do Sistema de Vigilância Alimentar e Nutricional (SISVAN), apresentamos uma alternativa de visualização detalhada sobre a situação nutricional da população brasileira.
                
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-nutrition-green/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-nutrition-green" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Adultos</h3>
                <p className="text-muted-foreground">Entre 20 e 59 anos</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-nutrition-orange/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-nutrition-orange" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2"> Unidades Geográficas</h3>
                <p className="text-muted-foreground">Municípios, Unidades Federativas e Regiões de Saúde</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-nutrition-blue/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-nutrition-blue" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Gêneros</h3>
                <p className="text-muted-foreground">Feminino e Masculino</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-nutrition-pink/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-nutrition-pink" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">10+ Anos de Dados</h3>
                <p className="text-muted-foreground">Análises de 2008 a 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Introduction Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
              Sobre este Projeto
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Nosso objetivo é fornecer informações confiáveis e territorializadas, 
                  apoiando gestores públicos, profissionais da saúde, pesquisadores e formuladores de políticas no planejamento de ações estratégicas e 
                  intervenções efetivas no campo da saúde nutricional.


            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-start">
              
              <div>
                
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  Abrangência dos Dados
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Nosso sistema permite explorar indicadores por:
                </p>
                 
                <ul className="list-none space-y-2 text-lg text-muted-foreground text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-green"
                    />{''}<span className="text-nutrition-green font-semibold">Unidades geográficas:</span>{''} Divisões Federativas e Regiões de Saúde;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-orange"
                    />{''}<span className="text-nutrition-orange font-semibold">Gênero:</span>{''} Feminino e Masculino;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-blue"
                    />{''}<span className="text-nutrition-blue font-semibold">Fase da vida:</span>{''} Adultos (20-59 anos);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-pink"
                    />{''}<span className="text-nutrition-pink font-semibold">Período:</span>{''} 2008 a 2024.
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
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-green"
                    />
                    Comparação da prevalência de {''} 
                    <span className="text-nutrition-green font-semibold"> obesidade entre mulheres adultas </span>{''} 
                     em diferentes estados (ex: Minas Gerais vs. São Paulo);
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-orange"
                    />
                    Avaliação da {''} 
                    <span className="text-nutrition-orange font-semibold">evolução da desnutrição infantil </span>{''}
                    em uma mesma região ao longo dos anos;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-blue"
                    />
                    Identificação de áreas com maior prevalência de {''} 
                    <span className="text-nutrition-blue font-semibold">sobrepeso entre adolescentes</span>{''}.
                  </li>
                </ul>


              </div>
              
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-6 text-primary">
                    Classificação do Estado Nutricional
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
              <div>
                
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  O que é o SISVAN?
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
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
              <div>
                
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  Por que isso importa?
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  Os dados apresentados aqui são uma ferramenta estratégica para:
                </p>
                <ul className="list-none space-y-2 text-lg text-muted-foreground text-justify">
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-green"
                    />
                  {''} 
                    <span className="text-nutrition-green font-semibold"> Monitoramento contínuo </span> da situação nutricional no território nacional;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-orange"
                    />
                    {''} 
                    <span className="text-nutrition-orange font-semibold">Avaliação de impacto</span>{''} de políticas públicas;
                  </li>
                  <li className="relative pl-5">
                    <span
                      className="absolute left-0 top-3 h-2 w-2 rounded-full bg-nutrition-blue"
                    />
                    {''} 
                    <span className="text-nutrition-blue font-semibold">Planejamento de ações locais</span>{''}, como campanhas de prevenção à obesidade.
                  </li>
                </ul>
                <br></br>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-justify">
                  {''}<span className="font-semibold">Transforme dados em ação</span>{''}. Use nosso mapeamento como base técnica para decisões mais eficazes em saúde pública.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introducao;