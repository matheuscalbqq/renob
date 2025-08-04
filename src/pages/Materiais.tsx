import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  BookOpen, 
  Video, 
  Presentation, 
  Database,
  ExternalLink,
  Calendar
} from "lucide-react";

const materiais = [
  {
    id: 1,
    titulo: "Relatório Técnico: Estado Nutricional do Brasil 2023",
    tipo: "Relatório",
    categoria: "Análise",
    descricao: "Análise completa dos dados do SISVAN de 2023, incluindo tendências regionais e recomendações para políticas públicas.",
    formato: "PDF",
    tamanho: "2.3 MB",
    data: "2024-01-15",
    icon: FileText,
    cor: "nutrition-green"
  },
  {
    id: 2,
    titulo: "Manual de Interpretação dos Gráficos SISVAN",
    tipo: "Manual",
    categoria: "Documentação",
    descricao: "Guia prático para interpretar as visualizações de dados nutricionais apresentadas nesta plataforma.",
    formato: "PDF",
    tamanho: "1.8 MB",
    data: "2024-01-10",
    icon: BookOpen,
    cor: "nutrition-orange"
  },
  {
    id: 3,
    titulo: "Webinar: Tendências Nutricionais no Brasil",
    tipo: "Vídeo",
    categoria: "Educacional",
    descricao: "Apresentação de 45 minutos sobre as principais descobertas dos dados SISVAN e suas implicações.",
    formato: "MP4",
    tamanho: "156 MB",
    data: "2023-12-20",
    icon: Video,
    cor: "nutrition-blue"
  },
  {
    id: 4,
    titulo: "Slides: Metodologia de Análise de Dados",
    tipo: "Apresentação",
    categoria: "Metodologia",
    descricao: "Apresentação detalhada sobre os métodos estatísticos e de visualização utilizados no projeto.",
    formato: "PPTX",
    tamanho: "4.1 MB",
    data: "2023-12-15",
    icon: Presentation,
    cor: "primary"
  },
  {
    id: 5,
    titulo: "Dataset Processado SISVAN 2008-2023",
    tipo: "Dados",
    categoria: "Dataset",
    descricao: "Base de dados limpa e processada do SISVAN, pronta para análises estatísticas e visualizações.",
    formato: "CSV",
    tamanho: "45.2 MB",
    data: "2024-01-05",
    icon: Database,
    cor: "secondary"
  },
  {
    id: 6,
    titulo: "Artigo: Desnutrição Infantil no Brasil (2024)",
    tipo: "Artigo",
    categoria: "Publicação",
    descricao: "Artigo científico publicado na Revista de Saúde Pública sobre evolução da desnutrição infantil.",
    formato: "PDF",
    tamanho: "980 KB",
    data: "2024-01-20",
    icon: FileText,
    cor: "accent"
  }
];

const recursos = [
  {
    titulo: "Portal SISVAN - Ministério da Saúde",
    descricao: "Acesso oficial aos dados e relatórios do Sistema de Vigilância Alimentar e Nutricional",
    url: "https://sisaps.saude.gov.br/sisvan/index",
    categoria: "Governo"
  },
  {
    titulo: "Atlas da Obesidade - IBGE",
    descricao: "Dados complementares sobre obesidade e sobrepeso no Brasil",
    url: "https://www.ibge.gov.br/",
    categoria: "EXEMPLO"
  },
  {
    titulo: "OMS - Padrões de Crescimento Infantil",
    descricao: "Referências internacionais para avaliação nutricional",
    url: "https://www.who.int/childgrowth/",
    categoria: "EXEMPLO"
  },
  {
    titulo: "Guia Alimentar para a População Brasileira",
    descricao: "Diretrizes oficiais do Ministério da Saúde para alimentação saudável",
    url: "https://bvsms.saude.gov.br/",
    categoria: "EXEMPLO"
  }
];

const Materiais = () => {
  const getIconColor = (cor: string) => {
    const colors: { [key: string]: string } = {
      'nutrition-green': 'text-nutrition-green',
      'nutrition-orange': 'text-nutrition-orange',
      'nutrition-blue': 'text-nutrition-blue',
      'primary': 'text-primary',
      'secondary': 'text-secondary',
      'accent': 'text-accent'
    };
    return colors[cor] || 'text-primary';
  };

  const getBgColor = (cor: string) => {
    const colors: { [key: string]: string } = {
      'nutrition-green': 'bg-nutrition-green/10',
      'nutrition-orange': 'bg-nutrition-orange/10',
      'nutrition-blue': 'bg-nutrition-blue/10',
      'primary': 'bg-primary/10',
      'secondary': 'bg-secondary/10',
      'accent': 'bg-accent/10'
    };
    return colors[cor] || 'bg-primary/10';
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Materiais de Apoio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Acesse relatórios, guias, datasets e recursos adicionais para 
            aprofundar seu conhecimento sobre nutrição no Brasil.
          </p>
        </div>

        {/* Downloads Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">
            Downloads Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiais.map((material) => {
              const IconComponent = material.icon;
              return (
                <Card key={material.id} className="shadow-medium hover:shadow-strong transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`p-3 rounded-lg ${getBgColor(material.cor)} group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`h-6 w-6 ${getIconColor(material.cor)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {material.categoria}
                          </Badge>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(material.data).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2">
                      {material.titulo}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {material.descricao}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <span className="font-medium mr-1">Formato:</span>
                          {material.formato}
                        </span>
                        <span className="flex items-center">
                          <span className="font-medium mr-1">Tamanho:</span>
                          {material.tamanho}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* External Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">
            Recursos Externos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recursos.map((recurso, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground flex-1">
                      {recurso.titulo}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {recurso.categoria}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {recurso.descricao}
                  </p>
                  
                  <Button variant="outline" asChild className="w-full">
                    <a 
                      href={recurso.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar Recurso
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact for More Materials */}
        <section>
          <Card className="shadow-medium bg-accent/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Precisa de Mais Materiais?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nossa equipe está sempre desenvolvendo novos materiais e análises. 
                Entre em contato conosco para solicitar relatórios específicos ou 
                dados customizados para sua pesquisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Solicitar Material Específico
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Entrar em Contato
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Materiais;