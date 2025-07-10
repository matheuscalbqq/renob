import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Globe } from "lucide-react";

const DadosSisvan = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Dados SISVAN
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore visualizações interativas dos dados do Sistema de Vigilância 
            Alimentar e Nutricional, organizados em três perspectivas complementares.
          </p>
        </div>

        {/* Data Visualization Tabs */}
        <Tabs defaultValue="mapeamento" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mapeamento" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mapeamento Estadual
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Mapeamento Regional
            </TabsTrigger>
            <TabsTrigger value="temporal" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Análises Temporais
            </TabsTrigger>
          </TabsList>

          {/* Mapeamento do Estado Nutricional */}
          <TabsContent value="mapeamento">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    Mapeamento do Estado Nutricional
                  </h2>
                  <p className="text-muted-foreground">
                    Visualização detalhada dos indicadores nutricionais distribuídos 
                    pelos estados brasileiros, permitindo identificar padrões regionais 
                    e áreas que requerem atenção especial.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-nutrition-green" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        Gráfico de barras
                      </h3>
                      <p className="text-muted-foreground">
                        Este espaço receberá o mapa interativo do Brasil com dados 
                        de estado nutricional por estado, desenvolvido com D3.js
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nutrition-green/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-green mb-2">Baixo Peso</h4>
                    <p className="text-sm text-muted-foreground">
                      Estados com maior prevalência de baixo peso
                    </p>
                  </div>
                  <div className="bg-nutrition-orange/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-orange mb-2">Sobrepeso</h4>
                    <p className="text-sm text-muted-foreground">
                      Distribuição do sobrepeso por estado
                    </p>
                  </div>
                  <div className="bg-nutrition-blue/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-nutrition-blue mb-2">Obesidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Índices de obesidade por região
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mapeamento Regional */}
          <TabsContent value="regional">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    Mapeamento Regional
                  </h2>
                  <p className="text-muted-foreground">
                    Comparação entre as cinco regiões brasileiras, destacando 
                    diferenças regionais nos padrões nutricionais e identificando 
                    características específicas de cada região.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 mx-auto mb-4 text-nutrition-orange" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        Gráfico D3.js - Comparação Regional
                      </h3>
                      <p className="text-muted-foreground">
                        Visualização comparativa entre as regiões Norte, Nordeste, 
                        Centro-Oeste, Sudeste e Sul do Brasil
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="bg-accent p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent-foreground mb-1">Norte</h4>
                    <p className="text-xs text-muted-foreground">7 Estados</p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent-foreground mb-1">Nordeste</h4>
                    <p className="text-xs text-muted-foreground">9 Estados</p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent-foreground mb-1">Centro-Oeste</h4>
                    <p className="text-xs text-muted-foreground">4 Estados</p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent-foreground mb-1">Sudeste</h4>
                    <p className="text-xs text-muted-foreground">4 Estados</p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent-foreground mb-1">Sul</h4>
                    <p className="text-xs text-muted-foreground">3 Estados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análises Temporais */}
          <TabsContent value="temporal">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    Análises Temporais
                  </h2>
                  <p className="text-muted-foreground">
                    Evolução dos indicadores nutricionais ao longo do tempo, 
                    permitindo identificar tendências, sazonalidades e o impacto 
                    de políticas públicas implementadas.
                  </p>
                </div>
                
                {/* Placeholder for D3 Chart */}
                <div className="bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 text-nutrition-blue" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        Gráfico D3.js - Séries Temporais
                      </h3>
                      <p className="text-muted-foreground">
                        Gráficos de linha e área mostrando a evolução temporal 
                        dos indicadores nutricionais brasileiros
                      </p>
                    </div>
                  </div>
                </div>
                

                <div className="mt-6 grid grid-cols-3 md:grid-cols-3 gap-6">
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Número de Entrevistados</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-green mt-1"></div>
                          <span className="text-muted-foreground">Todos:</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-orange mt-1"></div>
                          <span className="text-muted-foreground">Feminino:</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-3 w-3 rounded-[30%] bg-nutrition-blue mt-1"></div>
                          <span className="text-muted-foreground">Masculino:</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Tendências Identificadas</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-green mt-1.5"></div>
                          <span className="text-muted-foreground">Redução da desnutrição infantil</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-orange mt-1.5"></div>
                          <span className="text-muted-foreground">Aumento do sobrepeso em adultos</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-nutrition-blue mt-1.5"></div>
                          <span className="text-muted-foreground">Estabilização da obesidade infantil</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-foreground">Período Analisado</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Início dos dados:</span>
                          <span className="font-medium">2008</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dados mais recentes:</span>
                          <span className="font-medium">2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="font-medium">Anual</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        <Card className="mt-8 shadow-medium bg-accent/50">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
              Sobre os Gráficos D3.js
            </h3>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Os espaços acima estão preparados para receber gráficos interativos desenvolvidos 
              com a biblioteca D3.js. Cada seção foi projetada para apresentar os dados do SISVAN 
              de forma clara e intuitiva, permitindo exploração detalhada dos indicadores nutricionais.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DadosSisvan;