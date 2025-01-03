import "@losaweb/ui/globals.css";
import { Poppins } from "next/font/google";

import { Providers } from "@/components/providers";
import { cn } from "@losaweb/ui/lib/utils";
import type { Metadata } from "next";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lost Saga",
  description:
    "a free-to-play 3D fighting game. Entertainment. The game featured characters from science fiction, culture, and real-world history, and offered players the ability to switch characters on the fly to improve gameplay, combinations, and the overall combat experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("font-sans min-h-screen antialiased", font.className)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
