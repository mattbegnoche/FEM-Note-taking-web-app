import { getTags } from "@/lib/notes";
import BottomNav from "./_components/BottomNav";
import PageHeader from "./_components/PageHeader";
import SidebarNavigation from "./_components/SidebarNavigation";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tags = await getTags();
  const formattedTags = [...new Set(tags.flatMap((tag) => tag.tags))];

  return (
    <div className="flex flex-row h-svh overflow-clip">
      <SidebarNavigation tags={formattedTags} />
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
