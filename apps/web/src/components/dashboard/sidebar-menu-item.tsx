"use client";

import {
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@losaweb/ui/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@losaweb/ui/components/breadcrumb";
import {
  BadgeCheck,
  Bell,
  BoxIcon,
  ChartNoAxesColumn,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  GemIcon,
  Home,
  LifeBuoy,
  NewspaperIcon,
  ScrollTextIcon,
  Send,
  Settings2,
  ShoppingBagIcon,
  Sparkles,
  WalletIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "@losaweb/ui/components/separator";
import { Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@losaweb/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@losaweb/ui/components/avatar";
import { LogoutSidebarBtn } from "./logout-sidebar-btn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@losaweb/ui/components/collapsible";
import { cn } from "@losaweb/ui/lib/utils";
import { censorEmail } from "@/lib/utils";

import type { User } from "@losaweb/database/types/user";

const NavItems = {
  mainmenu: [
    {
      name: "Home",
      url: "/dashboard",
      icon: Home,
    },

    {
      name: "News",
      url: "/news",
      icon: NewspaperIcon,
    },
    {
      name: "Shop",
      url: "/shop",
      icon: ShoppingBagIcon,
    },
    {
      name: "Patch Notes",
      url: "/patch-notes",
      icon: ScrollTextIcon,
    },
    {
      name: "Leaderboard",
      url: "/leaderboard",
      icon: ChartNoAxesColumn,
    },
    {
      name: "Season Pass",
      url: "/seasonpass",
      icon: GemIcon,
    },
  ],
  platform: [
    {
      title: "Inventory",
      url: "#",
      icon: BoxIcon,
      isActive: false,
      items: [
        {
          title: "Items",
          url: "#",
        },
        {
          title: "Special Items",
          url: "#",
        },
        {
          title: "Giftbox",
          url: "#",
        },
      ],
    },
    {
      title: "Wallet",
      url: "#",
      icon: WalletIcon,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/wallet",
        },
        {
          title: "Top Up",
          url: "/wallet/topup",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
      ],
    },
  ],
  features: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export const SidebarMenuMainItem = () => {
  const navlinks = usePathname();

  return (
    <>
      <SidebarMenu>
        {NavItems.mainmenu.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              className={cn(
                "hover:text-sidebar hover:bg-sidebar-foreground active:text-sidebar active:bg-sidebar-foreground",
                {
                  "bg-sidebar-foreground text-sidebar": item.url === navlinks,
                }
              )}
              asChild
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
};

export const SidebarMenuPlatformItem = () => {
  const navlinks = usePathname();

  return (
    <SidebarMenu>
      {NavItems.platform.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.items.some(
            (subItem) => subItem.url !== "#" && navlinks === subItem.url
          )}
        >
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={item.title}>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
            {item.items?.length ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          isActive={subItem.url === navlinks}
                          asChild
                        >
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
};

export const SidebarMenuFeaturesItem = () => {
  return (
    <>
      <SidebarMenu>
        {NavItems.features.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild size="sm">
              <a href={item.url}>
                <item.icon />
                <span className="">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
};

export const SidebarMenuFooterItem = ({ userdata }: { userdata: User }) => {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={userdata.userinfo.userImage}
                    alt={userdata.nickName}
                  />
                  <AvatarFallback className="rounded-lg">
                    <span className="text-sidebar-foreground">
                      {userdata.nickName.charAt(0)}
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {userdata.nickName}
                  </span>
                  <span className="truncate text-xs">
                    {censorEmail(userdata.email)}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={userdata.userinfo.userImage}
                      alt={userdata.nickName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {userdata.nickName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userdata.nickName}
                    </span>
                    <span className="truncate text-xs">
                      {censorEmail(userdata.email)}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutSidebarBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

export const SidebarInsetSeparated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navlinks = usePathname();
  const currentTitle =
    NavItems.platform
      .flatMap((item) => [item, ...(item.items || [])])
      .find((item) => item.url !== "#" && navlinks === item.url)?.title ||
    NavItems.features.find(
      (item) => item.url !== "#" && navlinks.startsWith(item.url)
    )?.title ||
    NavItems.mainmenu.find(
      (item) => item.url !== "#" && navlinks.startsWith(item.url)
    )?.name ||
    "Dashboard";

  return (
    <>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 ">
          <div className="flex items-center gap-4 px-8 w-full">
            <div className="flex items-center gap-2 ">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />

                  {NavItems.platform.map((item) => {
                    const activeSubItem = item.items.find(
                      (subItem) => subItem.url === navlinks
                    );

                    if (activeSubItem) {
                      return (
                        <Fragment key={item.title}>
                          <BreadcrumbItem className="">
                            <BreadcrumbLink href={item.url}>
                              {item.title}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="" />
                          <BreadcrumbItem>
                            <BreadcrumbPage>
                              {activeSubItem.title}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </Fragment>
                      );
                    }
                    return null;
                  })}

                  {!NavItems.platform.some((item) =>
                    item.items.find((subItem) => subItem.url === navlinks)
                  ) && (
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {currentTitle || "Unknown Page"}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        {children}
      </SidebarInset>
    </>
  );
};
