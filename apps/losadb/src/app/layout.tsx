import "@losaweb/ui/globals.css";
import { Header } from "@/components/templates/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@losaweb/ui/components/sonner";
import { cn } from "@losaweb/ui/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Button } from "@losaweb/ui/components/button";
import Link from "next/link";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lost Saga Database",
  description: "a Web Database for Lost Saga (Character,Item,Tools)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", font.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto px-8 lg:px-12 py-8">
            {children}
          </main>
          {/* footer */}
          <footer>
            <div className="container mx-auto text-center my-8">
              Powered by &copy;
              <Button asChild variant="linkHover1">
                <Link href="https://github.com/LSFDC">
                  Lost Saga For Developer Community
                </Link>
              </Button>
            </div>
          </footer>
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
