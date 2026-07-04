import Link from "next/link";
import type { Note } from "@/lib/generated/prisma/client";
import SidebarAllNotes from "./SidebarAllNotes";
import NoteItem from "./NoteItem";
import NoteContent from "./NoteContent";
import SidebarRight from "./SidebarRight";

export default function NotesView({
  notes,
  selected,
  selectedId,
  basePath,
}: {
  notes: Note[];
  selected: Note | null;
  selectedId?: string;
  basePath: string;
}) {
  return (
    <>
      <SidebarAllNotes>
        {notes.map((note) => (
          <Link key={note.id} href={`${basePath}?note=${note.id}`}>
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
      {selected && <SidebarRight noteId={selected.id} />}
    </>
  );
}
