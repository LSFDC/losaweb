import Navbar from "@/components/navbar";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 text-white">
      <Navbar />
      {children}
    </div>
  );
}
