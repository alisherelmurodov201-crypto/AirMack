import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/admin/dashboard")({ component: Dashboard });

const dailyData = [
  { d: "Du", v: 1200 }, { d: "Se", v: 1800 }, { d: "Ch", v: 1500 },
  { d: "Pa", v: 2200 }, { d: "Ju", v: 2800 }, { d: "Sh", v: 3400 }, { d: "Ya", v: 3000 },
];
const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  m: ["Yan","Fev","Mar","Apr","May","Iyn","Iyl","Avg","Sen","Okt","Noy","Dek"][i],
  sales: 12000 + Math.round(Math.sin(i) * 4000) + i * 800,
}));
const pieData = [
  { name: "iPhone", value: 45 }, { name: "MacBook", value: 25 },
  { name: "AirPods", value: 20 }, { name: "Aksessuar", value: 10 },
];
const COLORS = ["oklch(0.62 0.18 255)", "oklch(0.7 0.15 180)", "oklch(0.65 0.2 30)", "oklch(0.7 0.18 140)"];

function Dashboard() {
  const { t } = useStore();
  const stats = [
    { i: DollarSign, label: t("revenue"), v: "$48,290", c: "+12.5%" },
    { i: ShoppingBag, label: t("orders"), v: "1,284", c: "+8.2%" },
    { i: Users, label: t("customers"), v: "892", c: "+5.4%" },
    { i: TrendingUp, label: t("growth"), v: "24.8%", c: "+2.1%" },
  ];

  return (
    <>
      <AdminHeader title={t("dashboard")} />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 grid place-items-center rounded-lg bg-gradient-accent text-white">
                  <s.i className="h-5 w-5" />
                </div>
                <span className="text-xs text-emerald-600 font-medium">{s.c}</span>
              </div>
              <div className="text-2xl font-bold">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2 shadow-card">
            <h3 className="font-semibold mb-4">{t("sales_chart")} — {t("monthly")}</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.62 0.18 255)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="oklch(0.62 0.18 255)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="m" /><YAxis />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.62 0.18 255)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-6 shadow-card">
            <h3 className="font-semibold mb-4">{t("category_chart")}</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={4}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 shadow-card">
          <h3 className="font-semibold mb-4">{t("daily")} {t("sales")}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="d" /><YAxis />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="v" fill="oklch(0.62 0.18 255)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </>
  );
}
