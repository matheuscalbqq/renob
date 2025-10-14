import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  BookOpen, 
  ExternalLink,
  Calendar
} from "lucide-react";
import sumExe    from "@/assets/docs/Sumário Executivo - Projeto RENOB-MG.pdf"
import result1   from "@/assets/docs/(Coleção) Marcadores de consumo alimentar infantil em Minas Gerais (1).pdf"
import result2   from "@/assets/docs/(Coleção) Consumo 2 A 9 anos - Mapa da obesidade infantil.pdf"
import relatorio from "@/assets/docs/Relatório de Viçosa - Mapeamento da obesidade em Viçosa-MG.pdf"
import mapObs    from "@/assets/docs/Mapa da obesidade - RENOB-MG.pdf"
import estdNutri from "@/assets/docs/Estado Nutricional de crianças maiores de 5 anos no Semiárido Brasileiro (3) (1).pdf"
import ebook_1_1 from "@/assets/docs/Ebook - Políticas e Serviços de saúde para o cuidado da pessoa com doença crônica não transmissível.pdf"
import ebook_1_2 from "@/assets/docs/E-book - Promoção da saúde e redução de riscos das doenças crônicas não transmissíveis no Sistema Único de Saúde.pdf"
import ebook_1_3 from "@/assets/docs/E-book - O processo de cuidado para as pessoas com Doenças Crônicas Não Transmissíveis.pdf"
import ebook_1_4 from "@/assets/docs/E-book - Abordagens transversais e coletivas para o cuidado da pessoa com doenças crônicas não transmissíveis.pdf"
import ebook_1_5 from "@/assets/docs/E-book - Atividades físicas e práticas corporais na Atenção Primária à Saúde para as pessoas com doenças crônicas não transmissíveis .pdf"
import ebook_2_1 from "@/assets/docs/Ebook - Ciclo de Políticas Públicas.pdf"
import ebook_2_2 from "@/assets/docs/E-book - Governança Pública na Atenção Primária à Saúde um olhar sobre a atuação dos gestores.pdf"
import ebook_2_3 from "@/assets/docs/E-book - Gerenciamento dos Processos na Atenção Primária à Saúde uma gestão de alto desempenho.pdf"
import ebook_2_4 from "@/assets/docs/E-book - Estrutura Organizacional da Atenção Primária à Saúde uma gestão para resultados.pdf"
import ebook_2_5 from "@/assets/docs/E-book - Planejamento estratégico ferramentas aplicadas à saúde pública.pdf"
import ebook_2_6 from "@/assets/docs/E-book - Licitações e contratos em saúde .pdf"
import ebook_2_7 from "@/assets/docs/E-book - Gestão de materiais, estqoue e logística.pdf"


const materiais = [
  {
    id: 1,
    titulo: "Sumário Executivo - RENOB-MG",
    tipo: "Relatório",
    categoria: "Documentação",
    descricao: "Estratégias, ações, metodologias e pesquisas para o controle da obesidade e doenças crônicas não transmissíveis.",
    formato: "PDF",
    tamanho: "38.9 MB",
    data: "2024-08-13",
    icon: FileText,
    cor: "primary",
    url: sumExe
  },
  {
    id: 2,
    titulo: "Resultados para a população de 0 a 23 meses da Atenção Primária à Saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "1º livro da coleção: Marcadores de consumo alimentar em Minas Gerais",
    formato: "PDF",
    tamanho: "14.23 MB",
    data: "2022",
    icon: BookOpen,
    cor: "accent",
    url: result1
  },
  {
    id: 3,
    titulo: "Resultados para a população de 2 a 9 anos da Atenção Primária à Saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "2º livro da coleção: Marcadores de consumo alimentar em Minas Gerais",
    formato: "PDF",
    tamanho: "5.45 MB",
    data: "2022",
    icon: BookOpen,
    cor: "accent",
    url: result2
  },
  {
    id: 4,
    titulo: "Relatório - Mapeamento da Obesidade em Viçosa-MG",
    tipo: "Relatório",
    categoria: "Análise",
    descricao: "Uma produção exclusiva sobre os impactos impactos da Covid-19 na Atenção Primária à saúde na cidade de Viçosa-MG",
    formato: "PDF",
    tamanho: "1.38 MB",
    data: "2023-02-17",
    icon: FileText,
    cor: "primary",
    url: relatorio
  },
  {
    id: 5,
    titulo: "Relatório - Mapa da Obesidade em Minas Gerais",
    tipo: "Relatório",
    categoria: "Análise",
    descricao: "Resultados e dados sobre o avanço das doenças crônicas e obesidade da população adulta mineira para melhorias na atenção primária à saúde",
    formato: "PDF",
    tamanho: "57.5 MB",
    data: "2022-12-06",
    icon: FileText,
    cor: "primary",
    url: mapObs
  },
  {
    id: 6,
    titulo: "Estado Nutricional de crianças maiores de 5 anos no Semiárido Brasileiro",
    tipo: "Relatório",
    categoria: "Análise",
    descricao: "Prevalências de Excesso de Peso, Emaciação, Déficit de Altura, Desnutrição e Dupla Carga de Má Nutrição, 2008 - 2022.",
    formato: "PDF",
    tamanho: "26.71 MB",
    data: "2025-03-14",
    icon: FileText,
    cor: "primary",
    url: estdNutri
  },
  {
    id: 7,
    titulo: "Políticas e serviços de saúde para o cuidado da pessoa com doença crônica não transmissível",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "1º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para PROFISSIONAIS de saúde",
    formato: "PDF",
    tamanho: "6.77 MB",
    data: "2022",
    icon: BookOpen,
    cor: "secondary",
    url: ebook_1_1
  },
  {
    id: 8,
    titulo: "Promoção da saúde e redução de riscos das doenças crônicas não transmissíveis no Sistema Único de Saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "2º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para PROFISSIONAIS de saúde",
    formato: "PDF",
    tamanho: "9.47 MB",
    data: "2022",
    icon: BookOpen,
    cor: "secondary",
    url: ebook_1_2
  },
  {
    id: 9,
    titulo: "O processo de cuidado para as pessoas com Doenças Crônicas Não Transmissíveis",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "3º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para PROFISSIONAIS de saúde",
    formato: "PDF",
    tamanho: "7.37 MB",
    data: "2022",
    icon: BookOpen,
    cor: "secondary",
    url: ebook_1_3
  },
  {
    id: 10,
    titulo: "Abordagens transversais e coletivas para o cuidado de pessoas com doença crônica não transmissível",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "4º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para PROFISSIONAIS de saúde",
    formato: "PDF",
    tamanho: "8.72 MB",
    data: "2022",
    icon: BookOpen,
    cor: "secondary",
    url: ebook_1_4
  },
  {
    id: 11,
    titulo: "Atividade física e práticas corporais na atenção primária saúde para pessoas com doenças crônicas não transmissíveis",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "5º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para PROFISSIONAIS de saúde",
    formato: "PDF",
    tamanho: "9.14 MB",
    data: "2022",
    icon: BookOpen,
    cor: "secondary",
    url: ebook_1_5
  },
  {
    id: 12,
    titulo: "Ciclo de políticas públicas e saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "1º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "8.31 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_1
  },
  {
    id: 13,
    titulo: "Governança pública na atenção primária à saúde: um olhar sobre a atuação dos gestores",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "2º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "7.46 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_2
  },
  {
    id: 14,
    titulo: "Gerenciamento dos processos na atenção primária à saúde: uma gestão de alto desempenho",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "3º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "7.45 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_3
  },
  {
    id: 15,
    titulo: "Estrutura organizacional da atenção primária à saúde: uma gestão para resultados",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "4º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "7.33 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_4
  },
  {
    id: 16,
    titulo: "Planejamento: estratégias e ferramentas aplicadas à saúde pública",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "5º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "7.05 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_5
  },
  {
    id: 17,
    titulo: "Licitações e contratos na saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "6º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "5.08 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_6
  },
  {
    id: 18,
    titulo: "Gestão de materiais, estoques e logística na saúde",
    tipo: "Coleção",
    categoria: "Coleção",
    descricao: "7º livro da coleção: Enfrentamento de doenças crônicas não transmissíveis no Sistema Único de Saúde: Estratégias para GESTORES de saúde",
    formato: "PDF",
    tamanho: "5.82 MB",
    data: "2024",
    icon: BookOpen,
    cor: "accent",
    url: ebook_2_7
  }
];

const artigos = [
  {
    id: 1,
    titulo:"Tradução e adaptação transcultural da Escala de Atitudes em Relação às Pessoas com Obesidade",
    data: "01/2025",
    revista: "Ciência & Saúde Coletiva",
    autores:"Oliveira ABC, Rocha DMUP, Moraes AA, Carneiro-Júnior MA, Hermsdorff HHM.",
    url: "https://cienciaesaudecoletiva.com.br/artigos/traducao-e-adaptacao-transcultural-da-escala-de-atitudes-em-relacao-as-pessoas-com-obesidade-atopbr/19483?id=19483&id=19483"
  },
  {
    id: 2,
    titulo:"The Effects of Subsidies for Healthy Foods on Food Purchasing Behaviors, Consumption Patterns, and Obesity/Overweight: A Systematic Review",
    data: "10/2024",
    revista: "Nutrition Reviews",
    autores:"Comini LO, Lopes SO, Rocha DMUP, da Costa Silva MM, Hermsdorff HHM",
    url: "https://doi.org/10.1093/nutrit/nuae153"
  },
  {
    id: 3,
    titulo:"Mapping and projections of obesity in the Brazilian adult population assisted in Primary Health Care: impact of the COVID-19 pandemic",
    data: "07/2024",
    revista: "Health Sciences Journal",
    autores:"Cruciol e Souza L, Rocha DMUP, da Silva Costa GH, Vidigal Castro LC, Hermsdorff HHM",
    url: "https://doi.org/10.21876/hsjhci.v14.2024.e1499"
  },
  {
    id: 4,
    titulo:"Questionário Palmore-Neri-Cachioni de Conhecimentos Básicos sobre a Velhice: atualização e validação de conteúdo",
    data: "06/2024",
    revista: "Scielo Brasil",
    autores:"Simião MMR, Pereira de Brito TR, Hermsdorff HHM, Cachioni M, de Carvalho Vidigal F",
    url: "https://doi.org/10.1590/2358-289820241418892P"
  }
]

const recursos = [
  {
    titulo: "Portal SISVAN - Ministério da Saúde",
    descricao: "Acesso oficial aos dados e relatórios do Sistema de Vigilância Alimentar e Nutricional",
    url: "https://sisaps.saude.gov.br/sisvan/index",
    categoria: "Governo"
  },
  {
    titulo: "RENOB-MG",
    descricao: "Site oficial do projeto RENOB-MG",
    url: "https://www.renobmg.ufv.br/",
    categoria: "Institucional"
  },
  {
    titulo: "OMS - Padrões de Crescimento Infantil",
    descricao: "Referências internacionais para avaliação nutricional",
    url: "https://www.who.int/childgrowth/",
    categoria: "Internacional"
  },
  {
    titulo: "Biblioteca Virtual em Saúde",
    descricao: "Acervo do Ministério da Saúde sobre alimentação saudável",
    url: "https://bvsms.saude.gov.br/",
    categoria: "Governo"
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
            Acesse relatórios, guias, artigos e recursos adicionais para 
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
              const date = material.data.length == 4? new Date(material.data).getUTCFullYear() : new Date(material.data).toLocaleDateString("pt-BR")
              return (
                <Card key={material.id} className="h-full shadow-medium hover:shadow-strong transition-all duration-300 group">
                  <CardContent className="p-6 flex h-full flex-col">
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
                            {date}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-3 line-clamp-3">
                      {material.titulo}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {material.descricao}
                    </p>

                    <div className="mt-auto">
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
                      <a 
                        href={material.url} 
                        target="_blank" 
                        download
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Articles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">
            Artigos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {artigos.map((artigo) => {
              const date = artigo.data
              return (
                <Card key={artigo.id} className="h-full shadow-medium hover:shadow-strong transition-all duration-300 group">
                  <a 
                        href={artigo.url} 
                        target="_blank" 
                        download
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                  <CardContent className="p-3 flex h-full flex-col">
                    
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {artigo.titulo}
                      </h3>
                    

                    <div className="flex items-center gap-2 mb-3">
                      <div className="inline-flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="leading-none">{date}</span>
                      </div>

                      <Badge variant="accent" className="text-xs leading-none py-0.5">
                        {artigo.revista}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                      <span className="text-secondary font-semibold">Autores:</span> {artigo.autores}
                    </p>
                    
                  </CardContent>
                  </a>
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
              <Card key={index} className="h-full shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="flex h-full p-6 flex-col">
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
                  
                  <Button variant="default" asChild className="w-full mt-auto">
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
                <a href="mailto:helenhermana@ufv.br">
                <Button variant="secondary" size="lg" className="px-8 w-40">
                  Entrar em Contato
                </Button>
                </a>
                <a href="https://www.renobmg.ufv.br/">
                <Button variant="secondary" size="lg" className="px-8 w-40">
                  Site Oficial
                </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Materiais;