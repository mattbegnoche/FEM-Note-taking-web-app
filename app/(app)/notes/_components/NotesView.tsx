import Link from "next/link";
import type { Note } from "@/lib/generated/prisma/client";
import NotesList from "./NotesList";
import NoteItem from "./NoteItem";
import NoteContent from "./NoteContent";
import NoteActionsPanel from "./NoteActionsPanel";

export default function NotesView({
  notes,
  selected,
  selectedId,
  basePath,
  isNew,
  query,
  emptyMessage = "You don't have any notes yet. Start a new note to capture your thoughts and ideas.",
  listHeader,
}: {
  notes: Note[];
  selected: Note | null;
  selectedId?: string;
  basePath: string;
  isNew?: boolean;
  query?: Record<string, string>;
  emptyMessage?: string;
  listHeader?: React.ReactNode;
}) {
  return (
    <>
      <NotesList
        className={selected || isNew ? "hidden md:flex" : "flex"}
      >
        {listHeader}
        {notes.length > 0 ? (
          notes.map((note) => (
            <Link
              key={note.id}
              href={{ pathname: basePath, query: { ...query, note: note.id } }}
            >
              <NoteItem
                title={note.title}
                tags={note.tags}
                lastEdited={note.lastEdited}
                active={note.id === selectedId}
              />
            </Link>
          ))
        ) : (
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </NotesList>
      {selected || isNew ? (
        <NoteContent
          key={selected?.id ?? "new"}
          note={selected}
          backHref={{ pathname: basePath, query }}
        />
      ) : (
        <div className="hidden p-6 text-sm text-muted-foreground md:block md:col-span-6">
          Select a note to view it.
        </div>
      )}
      {selected && (
        <NoteActionsPanel noteId={selected.id} isArchived={selected.isArchived} />
      )}
    </>
  );
}
