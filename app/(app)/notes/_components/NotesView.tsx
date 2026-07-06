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
  isNew,
  query,
  emptyMessage = "You don't have any notes yet. Start a new note to capture your thoughts and ideas.",
}: {
  notes: Note[];
  selected: Note | null;
  selectedId?: string;
  basePath: string;
  isNew?: boolean;
  query?: Record<string, string>;
  emptyMessage?: string;
}) {
  return (
    <>
      <SidebarAllNotes>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Link
              key={note.id}
              href={{ pathname: basePath, query: { ...query, note: note.id } }}
            >
              <NoteItem
                title={note.title}
                tags={note.tags}
                lastEdited={note.lastEdited.toISOString()}
                active={note.id === selectedId}
              />
            </Link>
          ))
        ) : (
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </SidebarAllNotes>
      {selected || isNew ? (
        <NoteContent key={selected?.id ?? "new"} note={selected} />
      ) : (
        ""
      )}
      {selected && (
        <SidebarRight noteId={selected.id} isArchived={selected.isArchived} />
      )}
    </>
  );
}
