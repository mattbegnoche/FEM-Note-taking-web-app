import BottomNav from "./_components/BottomNav";
import Sidebar from "./_components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Sidebar />
      {children}
      <BottomNav />
    </>
  );
}
