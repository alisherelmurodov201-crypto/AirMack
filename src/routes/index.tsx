import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AirMack — Apple mahsulotlari" },
      { name: "description", content: "iPhone, AirPods, MacBook va aksessuarlar — AirMack." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, products } = useStore();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section id="home" className="relative overflow-hidden bg-hero text-white">
        <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs mb-6 backdrop-blur">
              <Sparkles className="h-3 w-3" /> Premium Apple Store
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">{t("hero_title")}</h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg">{t("hero_sub")}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                <a href="#products">{t("explore")} <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur"
                asChild
              >
                <a 
                  href="https://t.me/airmack_shop_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Telegram kanal
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-accent/20 blur-3xl rounded-full" />
            <img src={hero} alt="Apple products" width={1600} height={1024} className="relative rounded-2xl shadow-glow" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { i: ShieldCheck, t: "100% Original" },
          { i: Truck, t: "Tezkor yetkazib berish" },
          { i: Sparkles, t: "Premium sifat" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-card shadow-card">
            <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-accent text-accent-foreground">
              <f.i className="h-5 w-5" />
            </div>
            <span className="font-medium">{f.t}</span>
          </div>
        ))}
      </section>

      <section id="products" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">{t("products")}</h2>
          <p className="text-muted-foreground">{t("products_sub")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section id="about" className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("about")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("about_text")}</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
