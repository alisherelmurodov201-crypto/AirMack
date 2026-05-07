import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Apple, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t, login, register } = useStore();
  const nav = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [err, setErr] = useState("");

  const canSubmit = u.trim().length > 0 && p.trim().length > 0 && (!isRegister || (name.trim().length > 0 && phone.length > 5));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+998 ")) {
      setPhone("+998 ");
    } else {
      setPhone(value);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    if (isRegister) {
      const success = register({ username: u, password: p, name, phone, isAdmin: false });
      if (success) {
        // Ro'yxatdan o'tganlar har doim landing page ga
        nav({ to: "/" });
      } else {
        setErr("Bu login band. Boshqa login tanlang.");
      }
    } else {
      const user = login(u, p);
      if (user) {
        // Admin bo'lsa admin panelga, aks holda landing page ga
        if (user.isAdmin) {
          nav({ to: "/admin" });
        } else {
          nav({ to: "/" });
        }
      } else {
        setErr(t("invalid"));
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex bg-hero text-white p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/90 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {t("brand")}
        </Link>
        <div>
          <Apple className="h-12 w-12 mb-6" />
          <h1 className="text-5xl font-bold leading-tight mb-4">{isRegister ? "Ro'yxatdan o'tish" : t("welcome_back")}</h1>
        </div>
        <div className="text-sm text-white/50">© AirMack</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-card">
          <h2 className="text-2xl font-bold mb-6">{isRegister ? "Ro'yxatdan o'tish" : t("login_title")}</h2>
          <form onSubmit={submit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <Label htmlFor="name">Ismingiz</Label>
                  <Input id="name" value={name} onChange={(e) => { setName(e.target.value); setErr(""); }} placeholder="Ismingiz" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input id="phone" value={phone} onChange={handlePhoneChange} placeholder="+998 90 123 45 67" className="mt-1.5" />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="u">{isRegister ? "Login" : t("username")}</Label>
              <Input id="u" value={u} onChange={(e) => { setU(e.target.value); setErr(""); }} placeholder={isRegister ? "Login tanlang" : "admin"} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="p">{t("password")}</Label>
              <Input id="p" type="password" value={p} onChange={(e) => { setP(e.target.value); setErr(""); }} placeholder="••••••••" className="mt-1.5" />
            </div>
            {err && <div className="text-sm text-destructive">{err}</div>}
            {canSubmit && (
              <Button type="submit" className="w-full bg-gradient-accent text-accent-foreground">
                {isRegister ? "Ro'yxatdan o'tish" : t("enter")}
              </Button>
            )}
            <div className="text-center text-sm">
              <button 
                type="button" 
                onClick={() => { setIsRegister(!isRegister); setErr(""); }} 
                className="text-accent hover:underline"
              >
                {isRegister ? "Akkauntingiz bormi? Kirish" : "Akkauntingiz yo'qmi? Ro'yxatdan o'tish"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
