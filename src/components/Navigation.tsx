import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigationItems = [
  { name: "Introdução", path: "/" },
  { name: "Nossa Missão", path: "/missao" },
  { name: "Dados SISVAN", path: "/dados" },
  { name: "Membros", path: "/membros" },
  { name: "Materiais de Apoio", path: "/materiais" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-16 w-16 translate-y-2"><img src="src/assets/logo-renob-vet.png"></img></div>
          <span className="text-xl font-bold text-primary">
            RENOB-MG
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors hover:text-primary p-2 rounded-md ${
                      isActive
                        ? "text-primary bg-accent"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};