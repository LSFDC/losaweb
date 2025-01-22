import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@losaweb/ui/components/sonner";
import "@losaweb/ui/globals.css";
import { cn } from "@losaweb/ui/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

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
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
