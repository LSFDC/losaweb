import { Button } from "@losaweb/ui/components/button";
import { cn } from "@losaweb/ui/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-accent">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md")}>
          🔐 Losa Panel
        </h1>
        <p className="text-white text-lg text-justify">
          Your all-in-one dashboard for managing your Lot Saga account.
        </p>
        <div>
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
