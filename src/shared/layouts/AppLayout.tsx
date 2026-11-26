import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarContent,
} from "@/shared/components/ui/sidebar";
import { Activity, CalendarDays } from "lucide-react";
interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 text-xl font-bold text-primary animate-in fade-in duration-500">
            <Activity className="size-6" />
            Rehabit
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/schedule">
                  <CalendarDays></CalendarDays>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
