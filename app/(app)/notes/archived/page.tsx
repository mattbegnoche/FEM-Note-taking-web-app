import { getArchivedNotes, getNote } from "@/lib/notes";
import { redirect } from "next/navigation";
import NotesView from "../_components/NotesView";

export default async function ArchivedNotes({
  searchParams,
}: {
  searchParams: Promise<{ note?: string }>;
}) {
  const { note: selectedId } = await searchParams;
  const notes = await getArchivedNotes();
  const selected = selectedId ? await getNote(selectedId) : null;

  if (!selected && notes.length > 0) {
    redirect(`/notes/archived?note=${notes[0].id}`);
  }

  return (
    <NotesView
      notes={notes}
      selected={selected}
      selectedId={selectedId}
      basePath="/notes/archived"
    />
  );
}
