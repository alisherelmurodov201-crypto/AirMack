import { useState, useEffect } from "react";
import { useStore, type Product } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Send } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ p, action }: { p: Product; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t, isAuth, currentUser } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Auto-fill user data if logged in
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure +998 prefix is always present
    if (!value.startsWith("+998 ")) {
      setPhone("+998 ");
    } else {
      setPhone(value);
    }
  };

  const sendToTelegram = async () => {
    if (!name || !phone) {
      toast.error(t("fill_all"));
      return;
    }

    setSending(true);
    
    // Get from localStorage (admin panel settings)
    const botToken = localStorage.getItem("telegram_bot_token") || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = localStorage.getItem("telegram_chat_id") || import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      toast.error("Telegram bot sozlanmagan. Admin bilan bog'laning.");
      setSending(false);
      return;
    }

    try {
      // Prepare message text
      const messageText = `Yangi buyurtma!

Mahsulot: ${p.name}
Narx: $${p.price}
Kategoriya: ${p.category}

Mijoz: ${name}
Telefon: ${phone}
Xabar: ${message || "Yo'q"}`;

      // Send text message
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: messageText
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        toast.success("Buyurtma yuborildi!");
        setName("");
        setPhone("+998 ");
        setMessage("");
        setOpen(false);
      } else {
        toast.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="group overflow-hidden cursor-pointer hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 border-border/50 p-0">
            <div className="aspect-[4/3] bg-secondary overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-3">
              <div className="text-[10px] text-muted-foreground mb-1">{p.category}</div>
              <h3 className="font-semibold text-sm mb-1.5 line-clamp-1">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">${p.price}</span>
                <span className="text-[10px] text-muted-foreground">{t("stock")}: {p.stock}</span>
              </div>
              {action && <div className="mt-3 flex gap-2">{action}</div>}
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{p.name}</DialogTitle>
            <DialogDescription>
              Mahsulot haqida batafsil ma'lumot va buyurtma berish
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{p.category}</div>
                <div className="text-3xl font-bold text-primary">${p.price}</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t("stock")}:</span>
                  <span className={`font-semibold ${p.stock > 5 ? "text-green-600" : p.stock > 0 ? "text-orange-600" : "text-red-600"}`}>
                    {p.stock > 0 ? `${p.stock} dona` : "Tugagan"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Buyurtma berish
                </h3>
                {!isAuth ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Buyurtma berish uchun tizimga kirish kerak
                    </p>
                    <Button asChild className="bg-gradient-accent text-accent-foreground">
                      <a href="/login">Tizimga kirish</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-xs">Ismingiz *</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ismingizni kiriting"
                        className="mt-1"
                        disabled={!!currentUser}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs">Telefon raqam *</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={handlePhoneChange}
                        placeholder="+998 90 123 45 67"
                        className="mt-1"
                        disabled={!!currentUser}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-xs">Qo'shimcha xabar</Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Savolingiz yoki izohingiz..."
                        className="mt-1 resize-none"
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={sendToTelegram} 
                      disabled={sending || p.stock === 0}
                      className="w-full bg-gradient-accent text-accent-foreground"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {sending ? "Yuborilmoqda..." : "Buyurtma berish"}
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center">
                      Buyurtmangiz Telegram orqali yuboriladi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
