import React, { Suspense } from "react";
import { MercenaryProvider } from "@/components/mercenary/mercenary-context";
import { MercenaryGrid } from "@/components/mercenary/mercenary-grid";
import { MercenaryToolbar } from "@/components/mercenary/mercenary-toolbar";
export default function Home() {
  return (
    <div className="space-y-8">
      <Suspense>
        <MercenaryProvider>
          <MercenaryToolbar />
          <MercenaryGrid />
        </MercenaryProvider>
      </Suspense>
    </div>
  );
}
