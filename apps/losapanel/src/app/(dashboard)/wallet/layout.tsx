import { WalletInfo } from "@/components/dashboard/wallet/wallet-info";

export default function LayoutWallet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <WalletInfo />
      {children}
    </div>
  );
}
