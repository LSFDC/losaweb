"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@losaweb/ui/components/switch";
import { cn } from "@losaweb/ui/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <Sun className={cn("h-4 w-4", theme === "dark" && "opacity-50")} />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className={cn("h-4 w-4", theme === "light" && "opacity-50")} />
    </div>
  );
}
