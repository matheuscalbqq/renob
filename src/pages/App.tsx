import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Introducao from "./Introducao";
import Missao from "./Missao";
import DadosSisvan from "./DadosSisvan";
import Membros from "./Membros";
import Materiais from "./Materiais";
import NotFound from "./NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Introducao />} />
            <Route path="/missao" element={<Missao />} />
            <Route path="/dados" element={<DadosSisvan />} />
            <Route path="/membros" element={<Membros />} />
            <Route path="/materiais" element={<Materiais />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  
);

export default App;
