import { Separator } from "@losaweb/ui/components/separator";
import { settingNavItems } from "@/lib/navigation";
import { SideSettingsMenu } from "@/components/dashboard/settings/side-menu-settings";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" space-y-6 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 px-6">
        <aside className="-mx-4 lg:w-1/5 border-r border-b rounded-br-md">
          <SideSettingsMenu items={settingNavItems} />
        </aside>
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
}
