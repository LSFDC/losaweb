import React, { ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
