import Link from "next/link";
import { getArchivedNotes, getNote } from "@/lib/notes";
import SidebarAllNotes from "../_components/SidebarAllNotes";
import NoteItem from "../_components/NoteItem";
import NoteContent from "../_components/NoteContent";
import SidebarRight from "../_components/SidebarRight";
import { redirect } from "next/navigation";

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
    <>
      <SidebarAllNotes>
        {notes.map((note) => (
          <Link key={note.id} href={`/notes/archived?note=${note.id}`}>
            <NoteItem
              title={note.title}
              tags={note.tags}
              lastEdited={note.lastEdited.toISOString()}
              active={note.id === selectedId}
            />
          </Link>
        ))}
      </SidebarAllNotes>
      <NoteContent key={selected?.id ?? "empty"} note={selected} />
      {selected && <SidebarRight noteId={selected?.id} />}
    </>
  );
}
