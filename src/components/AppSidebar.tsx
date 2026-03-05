import { LayoutDashboard, FileText, LogOut, BarChart3, User, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const sharedItems = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Executive Archive", url: "/reports", icon: FileText },
];

const userItems = [
  { title: "My Analysis", url: "/analysis", icon: BarChart3 },
];

const adminItems = [
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const navItems = isAdmin ? [...sharedItems, ...adminItems] : [...sharedItems, ...userItems];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-3 py-4 group-data-[collapsible=icon]:justify-center">
            <BarChart3 className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm font-bold text-primary group-data-[collapsible=icon]:hidden">
              ProfitView
            </span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent font-medium text-sidebar-primary"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{user?.name ?? "Guest"}</span>
              <Badge variant={isAdmin ? "default" : "secondary"} className="px-1.5 py-0 text-[10px]">
                {user?.role ?? "user"}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">{user?.email ?? ""}</span>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Log out">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

