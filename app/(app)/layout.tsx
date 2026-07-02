import BottomNav from "./_components/BottomNav";
import PageHeader from "./_components/PageHeader";
import SidebarNavigation from "./_components/SidebarNavigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <div className="w-full">
          <PageHeader />
        </div>
        <div className="grid grid-cols-12 h-full">{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
