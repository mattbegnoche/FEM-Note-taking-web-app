import BottomNav from "./_components/BottomNav";
import PageHeader from "./_components/PageHeader";
import SidebarNavigation from "./_components/SidebarNavigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row h-svh overflow-clip">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <div className="w-full">
          <PageHeader />
        </div>
        <div className="grid grid-cols-12 flex-1 min-h-0">{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
