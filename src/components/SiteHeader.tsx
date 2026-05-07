import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Apple, LogIn, Moon, Sun } from "lucide-react";

export function SiteHeader() {
  const { t, logout, theme, toggleTheme } = useStore();

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Apple className="h-6 w-6" />
          <span>{t("brand")}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#home" className="hover:text-accent transition-colors">{t("nav_home")}</a>
          <a href="#products" className="hover:text-accent transition-colors">{t("nav_products")}</a>
          <a href="#about" className="hover:text-accent transition-colors">{t("nav_about")}</a>
          <a href="#contact" className="hover:text-accent transition-colors">{t("nav_contact")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button asChild size="sm" className="bg-gradient-accent text-accent-foreground hover:opacity-90">
            <Link to="/login"><LogIn className="h-4 w-4 mr-1" />{t("login")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
