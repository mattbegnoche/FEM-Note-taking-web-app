import { getNotesByTag, getNote } from "@/lib/notes";
import NotesView from "../../_components/NotesView";

export default async function TagNotes({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ note?: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const { note: selectedId } = await searchParams;

  const notes = await getNotesByTag(tag);
  const selected = selectedId ? await getNote(selectedId) : null;

  const basePath = `/notes/tags/${encodeURIComponent(tag)}`;

  return (
    <NotesView
      notes={notes}
      selected={selected}
      selectedId={selectedId}
      basePath={basePath}
    />
  );
}
