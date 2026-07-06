import { getNote, searchNotes } from "@/lib/notes";
import { redirect } from "next/navigation";
import NotesView from "../_components/NotesView";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; note?: string }>;
}) {
  const { q, note: selectedId } = await searchParams;
  const query = q?.trim() ?? "";

  const notes = query ? await searchNotes(query) : [];
  const selected = selectedId ? await getNote(selectedId) : null;

  if (!selected && notes.length > 0) {
    redirect(
      `/notes/search?q=${encodeURIComponent(query)}&note=${notes[0].id}`,
    );
  }

  return (
    <NotesView
      notes={notes}
      selected={selected}
      selectedId={selectedId}
      basePath="/notes/search"
      query={query ? { q: query } : undefined}
      emptyMessage={
        query
          ? `No notes match "${query}". Try a different keyword.`
          : "Start typing to search your notes by title, content, or tags."
      }
    />
  );
}
