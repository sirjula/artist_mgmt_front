import * as React from "react";
import { Music, MicVocal, LayoutDashboard, LibraryBig, ListMusic, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sidebar navigation based on roles
const sidebarItems: Record<string, { title: string; url: string; icon: React.ElementType }[]> = {
  super_admin: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Songs", url: "/song", icon: Music },
    { title: "Artists", url: "/artist", icon: MicVocal },
    { title: "Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
    { title: "Users", url: "/user", icon: UsersRound },
  ],
  artist_manager: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Songs", url: "/songlist", icon: Music },
    { title: "Artists", url: "/artist", icon: MicVocal },
    { title: "Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
  ],
  artist: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Songs", url: "../song", icon: Music },
    { title: "My Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
  ],
  guest: [
  { title: "Home", url: "/dashboard", icon: LayoutDashboard }
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role_type || "guest"); // Default to "artist"
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const menuItems = sidebarItems[userRole || "guest"]; // Ensure valid role

  return (
    <Sidebar {...props}>
      <SidebarHeader>Artist Management System</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon size={18} className="mr-2" />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
