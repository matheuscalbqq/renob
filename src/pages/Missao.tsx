import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Lightbulb, Shield } from "lucide-react";

const Missao = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Nossa Missão
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nosso compromisso é com a promoção da saúde e bem-estar da população brasileira.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="shadow-medium bg-gradient-primary">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Democratizando o Acesso a Dados Nutricionais
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Trabalhamos com ciência baseada em evidências para fornecer informações confiáveis que auxiliem profissionais
                 e gestores de saúde a fomentar políticas públicas mais robustas, especialmente no que tange à prevenção da obesidade
                  por meio de um monitoramento e avaliação mais eficiente. Através deste site, esperamos fornecer subsídios para a formulação 
                  de políticas públicas de alimentação e nutrição mais eficazes.
              </p>
            </CardContent>
          </Card>
        </section>
        {/* Impact Phrase */}
        <div className="text-center mb-16">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto italic">
            Explore nossos mapas e gráficos para obter uma compreensão aprofundada do estado nutricional no Brasil e ajude-nos a construir um futuro mais saudável para todos.
          </p>
        </div>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-nutrition-green/10 flex items-center justify-center group-hover:bg-nutrition-green/20 transition-colors">
                  <Eye className="h-8 w-8 text-nutrition-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Transparência</h3>
                <p className="text-muted-foreground">
                  Apresentamos dados de forma clara e acessível, promovendo transparência 
                  na comunicação científica.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-nutrition-orange/10 flex items-center justify-center group-hover:bg-nutrition-orange/20 transition-colors">
                  <Heart className="h-8 w-8 text-nutrition-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Impacto Social</h3>
                <p className="text-muted-foreground">
                  Focamos em gerar conhecimento que contribua efetivamente para 
                  melhorar a saúde nutricional da população.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-nutrition-blue/10 flex items-center justify-center group-hover:bg-nutrition-blue/20 transition-colors">
                  <Lightbulb className="h-8 w-8 text-nutrition-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Inovação</h3>
                <p className="text-muted-foreground">
                  Utilizamos tecnologias modernas de visualização para tornar 
                  dados complexos compreensíveis e actionáveis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Rigor Científico</h3>
                <p className="text-muted-foreground">
                  Baseamos nossas análises em metodologias científicas sólidas 
                  e dados oficiais validados.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Nossos Objetivos
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Objetivos Gerais
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <span className="text-muted-foreground">
                      Facilitar o acesso e compreensão dos dados do SISVAN
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <span className="text-muted-foreground">
                      Promover a tomada de decisão baseada em evidências
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <span className="text-muted-foreground">
                      Contribuir para políticas públicas de nutrição mais efetivas
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Objetivos Específicos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-nutrition-green mt-2"></div>
                    <span className="text-muted-foreground">
                      Mapear o estado nutricional por região e estado
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-nutrition-orange mt-2"></div>
                    <span className="text-muted-foreground">
                      Analisar tendências temporais dos indicadores nutricionais
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-nutrition-blue mt-2"></div>
                    <span className="text-muted-foreground">
                      Identificar padrões e correlações nos dados
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Statement */}
        <section>
          <Card className="shadow-strong bg-muted/50">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Nosso Impacto Esperado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">
                    Para Gestores
                  </h4>
                  <p className="text-muted-foreground">
                    Informações claras para formulação de políticas públicas 
                    direcionadas e eficazes.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">
                    Para Pesquisadores
                  </h4>
                  <p className="text-muted-foreground">
                    Dados organizados e visualizações que facilitam 
                    análises e descobertas científicas.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">
                    Para a Sociedade
                  </h4>
                  <p className="text-muted-foreground">
                    Maior transparência e conscientização sobre questões 
                    nutricionais no país.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Missao;