import { getNotes, getNote } from "@/lib/notes";
import { redirect } from "next/navigation";
import NotesView from "./_components/NotesView";

export default async function AllNotes({
  searchParams,
}: {
  searchParams: Promise<{ note?: string; new?: string }>;
}) {
  const { note: selectedId, new: isNew } = await searchParams;
  const notes = await getNotes();
  const selected = selectedId ? await getNote(selectedId) : null;
  if (!selected && !isNew && notes.length > 0) {
    redirect(`/notes?note=${notes[0].id}`);
  }

  return (
    <>
      <NotesView
        notes={notes}
        selected={selected}
        selectedId={selectedId}
        basePath="/notes"
      />
    </>
  );
}
