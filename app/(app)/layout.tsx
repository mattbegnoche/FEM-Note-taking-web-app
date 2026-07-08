import { getTags } from "@/lib/notes";
import { getFontTheme } from "@/lib/preferences";
import BottomNav from "./_components/BottomNav";
import MobileHeader from "./_components/MobileHeader";
import PageHeader from "./_components/PageHeader";
import PageTitle from "./_components/PageTitle";
import SidebarNavigation from "./_components/SidebarNavigation";
import { FontTheme } from "@/lib/generated/prisma/enums";

const fontClasses = {
  SANS: "font-sans",
  SERIF: "font-serif",
  MONO: "font-mono",
} satisfies Record<FontTheme, string>;

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tags, fontTheme] = await Promise.all([getTags(), getFontTheme()]);
  const formattedTags = [...new Set(tags.flatMap((tag) => tag.tags))];

  return (
    <div
      className={`flex flex-row h-svh overflow-clip ${fontClasses[fontTheme]}`}
    >
      <SidebarNavigation tags={formattedTags} />
      <div className="flex flex-col w-full">
        <MobileHeader />
        <div className="w-full">
          <PageHeader />
        </div>
        <div className="md:hidden px-6 pt-6">
          <PageTitle hideWhenNoteOpen />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 pb-16 md:pb-0">
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
