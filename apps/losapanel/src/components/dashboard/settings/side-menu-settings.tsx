"use client";

import { buttonVariants } from "@losaweb/ui/components/button";
import { cn } from "@losaweb/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideSettingsMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SideSettingsMenu({
  className,
  items,
  ...props
}: SideSettingsMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
