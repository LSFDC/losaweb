import { HeaderTools } from "@/components/templates/header-tool";
import { Separator } from "@losaweb/ui/components/separator";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <div className="space-y-5">
          <HeaderTools />

          {children}
        </div>
      </div>
    </div>
  );
}
