"use client"; 

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import { NavUser } from "@/components/nav-user"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Mapping paths to readable names
const breadcrumbNames: Record<string, string> = {
  dashboard: "Dashboard",
  music: "Music",
  artist: "Artists",
  "my-music": "My Music",
  "my-albums": "My Albums",
  users: "Users",
  genre: "Genre",
  albums: "Albums",
};

export default function Page() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname(); // Correct function to get the current path

  // Get the current pathname and split it into segments
  const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role_type || "guest"); // Use role_type instead of role
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4 justify-between">
      {/* Left Side: Sidebar Trigger + Breadcrumb */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {/* User Role as First Item */}
            <BreadcrumbItem>
              <BreadcrumbPage>{userRole || "Loading..."}</BreadcrumbPage>
            </BreadcrumbItem>

            {/* Dynamically generated breadcrumbs */}
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              const label = breadcrumbNames[segment] || segment; // Use readable label if available

              return (
                <span key={href} className="flex items-center">
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {index === pathSegments.length - 1 ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
        <div className="flex justify-end">
      <NavUser />
      </div>
    </header>
  );
}
