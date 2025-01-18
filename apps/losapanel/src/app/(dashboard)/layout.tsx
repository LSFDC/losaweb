import SidebarDashboard from "@/components/dashboard/sidebar";
import { type Metadata } from "next";

interface DashboardLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Losa Panel",
    template: "%s - Losa Panel",
  },
};

export default function DashboardLayout({ children }: DashboardLayout) {
  return (
    <SidebarDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mih-h-screen">
          {children}
        </div>
      </div>
    </SidebarDashboard>
  );
}
