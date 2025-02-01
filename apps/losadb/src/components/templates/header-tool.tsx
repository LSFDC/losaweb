"use client";

import { toolList } from "@/lib/constant/tools";
import { Badge } from "@losaweb/ui/components/badge";
import { Separator } from "@losaweb/ui/components/separator";
import { usePathname } from "next/navigation";

export function HeaderTools() {
  const pathname = usePathname();

  const tool = toolList.find((tool) => tool.href === pathname);

  return (
    <div className="">
      {tool && (
        <div className="space-y-2">
          <h1 className="text-lg font-bold flex gap-2 items-center space-x-2">
            {tool?.name}

            {tool.beta && <Badge variant="destructive">BETA</Badge>}
          </h1>
          <p>{tool.description}</p>
          <Separator />
        </div>
      )}
    </div>
  );
}
