import { getNote, searchNotes } from "@/lib/notes";
import SearchForm from "@/app/(app)/_components/SearchForm";
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
      listHeader={
        <div className="flex flex-col gap-3 md:hidden">
          <SearchForm className="w-full" />
          {query && (
            <p className="text-sm text-muted-foreground">
              All notes matching &quot;{query}&quot; are displayed below.
            </p>
          )}
        </div>
      }
    />
  );
}
