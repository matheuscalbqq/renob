import heroImage from "@/assets/nutrition-hero.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { VenusAndMars, Globe, Users, Calendar1, ExternalLink } from "lucide-react";


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
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Rede para Enfrentamento da Obesidade e Doenças Crônicas em Minas Gerais{/*  (RENOB-MG) */}
            </h1>{/* 
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Seja bem-vindo ao nosso site dedicado ao monitoramento do estado nutricional da população brasileira.
            </p> */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-lg leading-relaxed md:text-justify">
                A <a className="text-muted-second hover:underline hover:text-muted" target="_blank" href="https://www.renobmg.ufv.br/">Rede para Enfrentamento da Obesidade e Doenças Crônicas em Minas Gerais (RENOB-MG)<ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a> é um projeto colaborativo entre pesquisadores e estudantes da Universidade Federal de Viçosa (UFV) e outras instituições parceiras, como Universidade Federal de Minas Gerais (UFMG) e Universidade Federal de Alfenas (UNIFAL-MG). Sediada no <a className="text-muted-second hover:underline hover:text-muted" href="https://ippds.ufv.br/">Instituto de Políticas Públicas e Desenvolvimento Sustentável (IPPDS)<ExternalLink className="inline-block h-3 w-3 align-text-bottom" aria-hidden /></a> da UFV, nossa missão é clara: desenvolver soluções inovadoras para o controle da obesidade e doenças crônicas. Todo o nosso trabalho visa fortalecer o Sistema Único de Saúde (SUS), com foco especial no estado de Minas Gerais.
                
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Adultos</h3>
                <p className="text-muted-foreground">Entre 20 e 59 anos</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-accent mb-2"> Unidades Geográficas</h3>
                <p className="text-accent/70">Municípios, Unidades Federativas e Regiões de Saúde</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <VenusAndMars className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Gêneros</h3>
                <p className="text-muted-foreground">Feminino e Masculino</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar1 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-accent mb-2">10+ Anos de Dados</h3>
                <p className="text-accent/70">Análises de 2008 a 2024</p>
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
              Nossa Trajetória
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6 md:text-justify">
                  O <span className="text-secondary/80">RENOB-MG</span> começou com um propósito de desenvolver estratégias, ações, metodologias e pesquisas para o controle da obesidade e das doenças crônicas não transmissíveis. Diante do cenário de avanço da obesidade e das doenças crônicas, percebemos que era fundamental produzir conhecimento científico e tecnológico para apoiar a criação de políticas públicas mais eficientes e fortalecer o Sistema Único de Saúde (SUS) e apoiar a gestão da saúde no estado de Minas Gerais.
Desde a sua fundação, o RENOB-MG promove um ambiente de investigação contínua que serve como base para todos os nossos projetos. Esse conhecimento é traduzido em formação qualificada, como no <span className="text-secondary/80">curso SALUS</span>, voltado para a capacitação estratégica de profissionais e gestores das Unidades Básicas de Saúde (UBS).
Essa trajetória foi construída a muitas mãos, envolvendo estudantes de graduação e pós-graduação que, por meio de seus trabalhos de conclusão de curso (TCCs), dissertações de mestrado e teses de doutorado, contribuem continuamente para o avanço de nossas análises. Além de contar experiência fundamental de professores e pesquisadores da UFV e de instituições parceiras.
Um dos frutos mais importantes dessa trajetória acadêmica e colaborativa é a construção deste site. Ele não é apenas um repositório de dados, mas uma ferramenta estratégica desenvolvida com um objetivo claro: <span className="text-secondary/80">auxiliar gestores e profissionais da saúde a analisarem o seu território</span>.
A plataforma foi pensada para permitir a identificação de padrões, a visualização de mudanças temporais e o mapeamento de áreas prioritárias. Acreditamos que, ao oferecer essa análise detalhada, estamos fomentando a criação de ações mais direcionadas e eficazes para o enfrentamento da obesidade, garantindo que o cuidado chegue às localidades que precisam de maior atenção.
            </p>
            
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introducao;