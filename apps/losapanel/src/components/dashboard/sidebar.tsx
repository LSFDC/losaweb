import logo from "@/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@losaweb/ui/components/sidebar";

import Image from "next/image";

import {
  SidebarInsetSeparated,
  SidebarMenuFeaturesItem,
  SidebarMenuFooterItem,
  SidebarMenuMainItem,
  SidebarMenuPlatformItem,
} from "@/components/dashboard/sidebar-menu-item";
import { UserModel } from "@/model/user";

export default async function SidebarDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await UserModel.getUserSession();

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt="logo"
                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary-foreground text-sidebar-primary-foreground "
                    priority
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Losa Panel</span>
                    <span className="truncate text-xs">Premium</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenuMainItem />
        </SidebarGroup>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenuPlatformItem />
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>{/* <ThemeToggle2 /> */}</SidebarMenu>
              <SidebarMenuFeaturesItem />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuFooterItem userdata={session!} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInsetSeparated>{children}</SidebarInsetSeparated>
    </SidebarProvider>
  );
}
