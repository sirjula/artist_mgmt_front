"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [user, setUser] = useState<{ first_name: string; email: string } | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
    sessionStorage.removeItem("user")

    // Redirect to login page
    router.push("/")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user ? (
                  <>
                    <span className="truncate font-semibold">{user.first_name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </>
                ) : (
                  <span className="text-gray-400">Loading...</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {user ? (
                    <>
                      <span className="truncate font-semibold">{user.first_name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Loading...</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout Button */}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
