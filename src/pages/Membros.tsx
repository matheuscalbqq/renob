import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github } from "lucide-react";
import LattesIcon from "@/components/LattesIcon"



const membros = [
  {
    id: 1,
    nome: "Daniela Mayumi Usuda Prado Rocha",
    cargo: "Pós-Doutoranda",
    especialidade: "Nutrição em Saúde Pública ?",
    avatar: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4266471D1",
    descricao: [
      "Doutora em Nutrição pela UFV",
      "Desenvolvimento e Tecnologia de Alimentos",
      "Doenças Crônicas não Transmissíveis",
      "Inflamação",
      "Nutrição Bioquímica",
      "Nutrição Clínica"
    ],
    contatos: {
      email:    "dani@dani.com.br",
      lattes:   "1255736788675899",
      linkedin: "dani",
      github:   "dani"
    }
  },
  {
    id: 2,
    nome: "Gustavo de Oliveira Almeida",
    cargo: "Doutorando",
    especialidade: "Bioinformática",
    avatar: "https://avatars.githubusercontent.com/u/110310596?v=4",
    descricao: [
      "Mestre em Ciência da Computação pela UFV",
      "Aprendizagem de máquina",
      "Bacharel em Física Teórica pela UFV",
      "Caracterização de peptídeos naturais",
      "Desenvolvedor na área de dados"
    ],
    contatos: {
      email:  "gustavo.o.almeida@ufv.br",
      github: "goalmeida05",
      lattes: "7406360365770055"
    }
  },
  {
    id: 3,
    nome: "Prof. Helen Hermana Miranda Hermsdorff",
    cargo: "Coordenadora do projeto",
    especialidade: "Nutrição em doenças crônicas não transmissíveis",
    avatar: "https://nit.ufv.br/wp-content/uploads/2024/11/Helen-Hermana-Miranda-Hermsdorff-150x150.jpg",
    descricao: [
      "Doutora em Alimentação, Fisiologia e Saúde pela Universidad de Navarra, Espanha",
      "Líder do Grupo de Estudos em Nutrição e Obesidade - GENO",
      "Produção de material técnico-científico e análise de dados secundários no processo de qualificação de profissionais e gestores de saúde no manejo da obesidade e comorbidades"
    ],
    contatos: {
      email:  "helenhermana@ufv.br",
      lattes: "8193454290644430"
    }
  },
  {
    id: 4,
    nome: "Matheus Cavalcanti de Albuquerque",
    cargo: "Desenvolvedor e Analista de Dados",
    especialidade: "Ciência de Dados em Saúde",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFiLooVjTzIzg/profile-displayphoto-shrink_800_800/B4DZchAJ1nHwAc-/0/1748605378434?e=1756944000&v=beta&t=uumnlpONZ40deIR73fvM8fjn8dFzuj-XyW1emfAMZxg",
    descricao: [
      "Bacharel em Física Teórica pela UFV",
      "Ciência de Dados",
      "Data Pipeline (ETL) via Python",
      "Desenvolvimento Front-End com foco em Visualização de Dados"
    ],
    contatos: {
      email:    "matheusc.albqq@gmail.com",
      linkedin: "matheusc-albqq",
      github:   "matheuscalbqq",
      lattes:   "9242679981831049"
    }
  },
  {
    id: 5,
    nome: "Prof. Sabrina de Azevedo Silveira",
    cargo: "Colaboradora do Projeto",
    especialidade: "Bioinformática",
    avatar: "https://www2.dpi.ufv.br/wp-content/uploads/2015/12/sabrina-150x150.png",
    descricao: [
      "Doutorado em Bioinformática pela UFMG",
      "Aprendizagem de máquinas",
      "Base de Dados Biológicos e Visualização de Dados",
      "Mineração de Dados",      
      "Predição de Função de Enzima"
    ],
    contatos: {
      email: "sabrina@ufv.br",
      lattes: "0899817111748167"
    }
  }
];

const Membros = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Nossa Equipe
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os profissionais dedicados que tornam este projeto possível, 
            unindo expertise em nutrição, análise de dados e tecnologia.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {membros.map((membro) => (
            <Card key={membro.id} className="shadow-medium hover:shadow-strong transition-all duration-300 group flex flex-col h-full">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={membro.avatar} alt={membro.nome} className="object-cover"/>
                    <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                      {membro.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground w-60 flex-center ml-12">
                    {membro.nome}
                  </h3>
                  
                  <Badge variant="accent" className="mb-2">
                    {membro.cargo}
                  </Badge>
                  
                  <p className="text-sm text-secondary/80 font-medium">
                    {membro.especialidade}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold mb-3 text-foreground">Experiência:</h4>
                  <ul className="space-y-2">
                    {membro.descricao.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Links */}
                <div className="border-t pt-4 mt-auto">
                  <h4 className="font-semibold mb-3 text-foreground">Links:</h4>
                  <div className="flex flex-wrap gap-2">
                    {membro.contatos.email && (
                      <a
                        href={`mailto:${membro.contatos.email}`}
                        className="flex items-center space-x-1 px-3 py-1 bg-accent/30 rounded-full text-xs hover:bg-muted/80 transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span>Email</span>
                      </a>
                    )}                    
                    {membro.contatos.lattes && (
                      <a
                        href={`http://lattes.cnpq.br/${membro.contatos.lattes}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 bg-primary/40 rounded-full text-xs hover:bg-foreground/20 transition-colors"
                      >
                        <LattesIcon className="h-3 w-3 text-primary"/>
                        <span className="text-white">Lattes</span>
                      </a>
                    )}
                    {membro.contatos.github && (
                      <a
                        href={`https://github.com/${membro.contatos.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 bg-foreground/10 rounded-full text-xs hover:bg-foreground/20 transition-colors"
                      >
                        <Github className="h-3 w-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {membro.contatos.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${membro.contatos.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 bg-nutrition-blue/10 text-nutrition-blue rounded-full text-xs hover:bg-nutrition-blue/20 transition-colors"
                      >
                        <Linkedin className="h-3 w-3" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Statistics */}
        <Card className="shadow-medium bg-gradient-primary">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              Estatísticas da Equipe
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <h3 className="text-3xl font-bold mb-2">5</h3>
                <p className="text-white/90">Membros</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">3</h3>
                <p className="text-white/90">Doutores</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">30+</h3>
                <p className="text-white/90">Anos de Experiência</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="text-white/90">Projetos Realizados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Membros;