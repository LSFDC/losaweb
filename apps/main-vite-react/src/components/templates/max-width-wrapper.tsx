import Navbar from "@/components/templates/navbar";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white">
      <Navbar />
      {children}
    </div>
  );
}
