import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingBag, Award } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({ component: Reports });

const weekData = Array.from({ length: 7 }, (_, i) => ({
  d: ["Du","Se","Ch","Pa","Ju","Sh","Ya"][i],
  rev: 800 + Math.round(Math.random() * 2000),
  ord: 10 + Math.round(Math.random() * 30),
}));
const topProducts = [
  { n: "iPhone 15 Pro", v: 142 }, { n: "AirPods Pro", v: 98 },
  { n: "MacBook Air", v: 67 }, { n: "Leather Case", v: 53 }, { n: "iPhone 14", v: 41 },
];
const radarData = [
  { k: "iPhone", v: 95 }, { k: "MacBook", v: 80 }, { k: "AirPods", v: 88 },
  { k: "iPad", v: 60 }, { k: "Aksessuar", v: 70 }, { k: "Watch", v: 55 },
];

function Reports() {
  const { t } = useStore();
  const kpi = [
    { i: DollarSign, l: t("revenue"), v: "$284,560" },
    { i: ShoppingBag, l: t("orders"), v: "3,420" },
    { i: TrendingUp, l: t("avg_order"), v: "$83.20" },
    { i: Award, l: t("growth"), v: "+18.4%" },
  ];

  return (
    <>
      <AdminHeader title={t("reports")} />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpi.map((k, i) => (
            <Card key={i} className="p-6 shadow-card">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-gradient-accent text-white mb-3">
                <k.i className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">{k.v}</div>
              <div className="text-sm text-muted-foreground">{k.l}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card">
            <h3 className="font-semibold mb-4">{t("weekly_revenue")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="d" /><YAxis />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="rev" stroke="oklch(0.62 0.18 255)" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="ord" stroke="oklch(0.65 0.2 30)" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="font-semibold mb-4">{t("top_products")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" /><YAxis dataKey="n" type="category" width={110} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="v" fill="oklch(0.62 0.18 255)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card lg:col-span-2">
            <h3 className="font-semibold mb-4">{t("report_overview")}</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="k" />
                <PolarRadiusAxis />
                <Radar dataKey="v" stroke="oklch(0.62 0.18 255)" fill="oklch(0.62 0.18 255)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </main>
    </>
  );
}
