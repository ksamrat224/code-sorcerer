"use client";
import { Github, BookOpen, Settings, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from "@/module/auth/components/logout";
import { title } from "process";
import { url } from "inspector";
export const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {}, []);
  useEffect(() => {
    setMounted(true);
  }, []);
  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BookOpen,
    },
    {
      title: "Repositories",
      url: "/dashboard/repository",
      icon: Github,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: BookOpen,
    },
    {
      title: "Subscriptions",
      url: "/dashboard/subscription",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];
  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/dashboard");
  };
  if (!mounted || !session) return null;
  const user = session.user;
  const username = user.name || "Guest";
  const userEmail = user.email || " ";
  const useAvatar = user.image || " ";
  const userInitials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex flex-col gap-4 px-2 py-6">
          <div className="flex items-center gap-4 px-3 py-4 rounded-r-lg bg-sidebar-accent/50 hover:bg-sidebar-accent/70 transition-colors">
            <div className="flex items-center justify-center w-12 h-12  rounded-lg bg-primary text-primary-foreground shrink-0">
              <Github className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground  tracking-wide">
                Connected Accounts
              </p>
              <p className="text-sm font-medium text-sidebar-foreground/90">
                @{username}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6 flex-col gap-1">
        <div className="mb-2">
          <p className="text-xs font-semibold  text-sidebar-foreground/60 px-3 mb-3 uppercase tracking-wide">
            Menu
          </p>
        </div>
        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`h-11 px-4 rounded-lg  transition-all duration-200 ${
                  isActive(item.url)
                    ? "bg-sidebar-accent/50 hover:bg-sidebar-accent/70"
                    : "hover:bg-sidebar-accent/60 text-sidebar-foreground/90"
                }`}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t px-3 py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 px-4 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors "
                >
                  <Avatar className="h-10 w-10 rounded-lg shrink-0">
                    <AvatarImage
                      src={useAvatar || "/placeholder.svg"}
                      alt={username}
                    />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm  leading-relaxed min-w-0">
                    <span className="truncate font-semibold text-base">
                      {username}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {userEmail}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
