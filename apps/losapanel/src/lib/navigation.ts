import {
  BoxIcon,
  ChartNoAxesColumn,
  GemIcon,
  Home,
  LifeBuoy,
  NewspaperIcon,
  ScrollTextIcon,
  Send,
  Settings2,
  ShoppingBagIcon,
  WalletIcon,
} from "lucide-react";

export const settingNavItems = [
  {
    title: "General",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Security",
    href: "/settings/security",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

export const SidebarNavItems = {
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
      url: "/wallet",
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
        {
          title: "Notifications",
          url: "/settings/notifications",
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
