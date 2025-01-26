import { Database } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <Link href="/">
            <h1 className="text-xl font-bold">Lost Saga Database</h1>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 items-center justify-center">
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/api/swagger"
              target="_blank"
              className="hover:bg-blue-700 px-4 py-2 rounded-md hover:text-white"
            >
              API
            </Link>
            <Link
              href="/tools"
              className="hover:bg-blue-700 px-4 py-2 rounded-md hover:text-white"
            >
              Tools
            </Link>
            <Link
              href="https://github.com/LSFDC/losaweb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-700  px-4 py-2 rounded-md hover:text-white"
            >
              Github
            </Link>
            <Link
              href="https://discord.gg/b5MeZxYEZf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-700  px-4 py-2 rounded-md hover:text-white"
            >
              Discord
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
