import { useStore } from "@/lib/store";
import { Apple, MapPin, Phone, Instagram, Facebook, Send } from "lucide-react";

export function SiteFooter() {
  const { t } = useStore();
  return (
    <footer id="contact" className="bg-sidebar text-sidebar-foreground mt-24">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Apple className="h-6 w-6" />
            <span className="text-xl font-semibold">{t("brand")}</span>
          </div>
          <p className="text-sm text-sidebar-foreground/70 leading-relaxed">{t("about_text")}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">{t("contact")}</h3>
          <div className="space-y-3 text-sm text-sidebar-foreground/80">
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" />{t("address_val")}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />+998 91 977 01 00</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />+998 90 415 70 00</div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">{t("follow")}</h3>
          <div className="flex gap-3">
            <a 
              href="https://t.me/airmack_shop_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-10 w-10 grid place-items-center rounded-full bg-sidebar-accent hover:bg-accent transition-colors"
              title="Telegram kanal"
            >
              <Send className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 grid place-items-center rounded-full bg-sidebar-accent hover:bg-accent transition-colors"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 grid place-items-center rounded-full bg-sidebar-accent hover:bg-accent transition-colors"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-6 text-center text-xs text-sidebar-foreground/60">
        © {new Date().getFullYear()} {t("brand")}. {t("rights")}.
      </div>
    </footer>
  );
}
