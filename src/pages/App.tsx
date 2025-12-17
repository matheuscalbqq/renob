import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import Introducao from "./Introducao";
import Missao from "./Missao";
import DadosSisvan from "./DadosSisvan";
import Membros from "./Membros";
import Materiais from "./Materiais";
import Metodologia from "./Metodologia";
import NotFound from "./NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Introducao />} />
            <Route path="/missao" element={<Missao />} />
            <Route path="/equipe" element={<Membros />} />
            <Route path="/metodologia" element={<Metodologia />} />
            <Route path="/analise" element={<DadosSisvan />} />
            <Route path="/materiais" element={<Materiais />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  
);

export default App;
