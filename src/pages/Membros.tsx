import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github } from "lucide-react";

const membros = [
  {
    id: 1,
    nome: "Dr. Ana Silva",
    cargo: "Coordenadora do Projeto",
    especialidade: "Nutrição em Saúde Pública",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "PhD em Nutrição pela USP",
      "15 anos de experiência em políticas públicas de alimentação",
      "Especialista em análise de dados do SISVAN",
      "Coordenadora de projetos de pesquisa em nutrição populacional"
    ],
    contatos: {
      email: "ana.silva@nutricao.br",
      linkedin: "ana-silva-nutricao",
      github: "anasilva-nut"
    }
  },
  {
    id: 2,
    nome: "Prof. Carlos Oliveira",
    cargo: "Pesquisador Senior",
    especialidade: "Epidemiologia Nutricional",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "Doutor em Epidemiologia pela FIOCRUZ",
      "Especialista em análises estatísticas complexas",
      "Autor de mais de 50 artigos sobre nutrição brasileira",
      "Consultor da OMS para políticas nutricionais"
    ],
    contatos: {
      email: "carlos.oliveira@pesquisa.br",
      linkedin: "carlos-oliveira-epi"
    }
  },
  {
    id: 3,
    nome: "Marina Santos",
    cargo: "Desenvolvedora Front-end",
    especialidade: "Visualização de Dados",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "Especialista em D3.js e visualização interativa",
      "Formada em Ciência da Computação pela UFMG",
      "5 anos de experiência em dashboards de saúde pública",
      "Desenvolvedora de soluções web responsivas e acessíveis"
    ],
    contatos: {
      email: "marina.santos@dev.br",
      linkedin: "marina-santos-dev",
      github: "marinasantos-viz"
    }
  },
  {
    id: 4,
    nome: "Dr. Roberto Lima",
    cargo: "Analista de Dados",
    especialidade: "Ciência de Dados em Saúde",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "PhD em Estatística Aplicada à Saúde",
      "Especialista em machine learning para dados nutricionais",
      "Experiência com big data em sistemas de saúde",
      "Desenvolvedor de modelos preditivos para políticas públicas"
    ],
    contatos: {
      email: "roberto.lima@dados.br",
      linkedin: "roberto-lima-data",
      github: "robertolima-ml"
    }
  },
  {
    id: 5,
    nome: "Dra. Fernanda Costa",
    cargo: "Consultora em Políticas Públicas",
    especialidade: "Gestão em Saúde Pública",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "Mestre em Administração Pública pela FGV",
      "10 anos de experiência no Ministério da Saúde",
      "Especialista em implementação de políticas nutricionais",
      "Consultora em avaliação de programas de saúde"
    ],
    contatos: {
      email: "fernanda.costa@politicas.br",
      linkedin: "fernanda-costa-saude"
    }
  },
  {
    id: 6,
    nome: "Lucas Ferreira",
    cargo: "Designer UX/UI",
    especialidade: "Design de Interfaces para Saúde",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    descricao: [
      "Especialista em UX Design para aplicações de saúde",
      "Formado em Design Digital pela ESPM",
      "Experiência em design de sistemas complexos",
      "Focado em acessibilidade e usabilidade"
    ],
    contatos: {
      email: "lucas.ferreira@design.br",
      linkedin: "lucas-ferreira-ux",
      github: "lucasferreira-ui"
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
            <Card key={membro.id} className="shadow-medium hover:shadow-strong transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={membro.avatar} alt={membro.nome} />
                    <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                      {membro.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {membro.nome}
                  </h3>
                  
                  <Badge variant="secondary" className="mb-2">
                    {membro.cargo}
                  </Badge>
                  
                  <p className="text-sm text-nutrition-green font-medium">
                    {membro.especialidade}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
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
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 text-foreground">Contato:</h4>
                  <div className="flex flex-wrap gap-2">
                    {membro.contatos.email && (
                      <a
                        href={`mailto:${membro.contatos.email}`}
                        className="flex items-center space-x-1 px-3 py-1 bg-muted rounded-full text-xs hover:bg-muted/80 transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span>Email</span>
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
                <h3 className="text-3xl font-bold mb-2">6</h3>
                <p className="text-white/90">Membros</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">4</h3>
                <p className="text-white/90">PhDs</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
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