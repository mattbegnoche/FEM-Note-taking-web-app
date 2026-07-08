import CreateNoteFab from "./_components/CreateNoteFab";

export default function NoteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CreateNoteFab />
      {children}
    </>
  );
}
