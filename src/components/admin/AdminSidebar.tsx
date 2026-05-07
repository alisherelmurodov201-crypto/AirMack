import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Package, BarChart3, LogOut, Apple, Settings } from "lucide-react";

export function AdminSidebar() {
  const { t, logout, currentUser } = useStore();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { url: "/admin/dashboard", title: t("dashboard"), icon: LayoutDashboard },
    { url: "/admin/products", title: t("products_section"), icon: Package },
    { url: "/admin/reports", title: t("reports"), icon: BarChart3 },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-accent">
            <Apple className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold">{t("brand")}</div>
            <div className="text-xs text-sidebar-foreground/60">{currentUser?.name}</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild isActive={path === it.url} className="h-11">
                    <Link to={it.url} className="flex items-center gap-3">
                      <it.icon className="h-4 w-4" />
                      <span>{it.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenuButton
          onClick={() => { logout(); nav({ to: "/" }); }}
          className="h-11 text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("logout")}</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
