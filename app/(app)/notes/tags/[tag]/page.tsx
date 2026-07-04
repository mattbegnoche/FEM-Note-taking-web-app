import { getNotesByTag, getNote } from "@/lib/notes";
import { redirect } from "next/navigation";
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
  if (!selected && notes.length > 0) {
    redirect(`${basePath}?note=${notes[0].id}`);
  }

  return (
    <NotesView
      notes={notes}
      selected={selected}
      selectedId={selectedId}
      basePath={basePath}
    />
  );
}
