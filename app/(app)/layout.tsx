import BottomNav from "./_components/BottomNav";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <BottomNav />
    </div>
  );
}
