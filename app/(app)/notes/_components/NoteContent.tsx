"use client";
import type { Note } from "@/lib/generated/prisma/client";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createNote, updateNote } from "../actions";
import MobileNoteActions from "./MobileNoteActions";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

type BackHref = { pathname: string; query?: Record<string, string> };

function NoteContent({
  note,
  backHref,
}: {
  note: Note | null;
  backHref: BackHref;
}) {
  const router = useRouter();

  async function handleSave(formData: FormData) {
    if (note) {
      const result = await updateNote(formData);
      if (result.ok) toast.success("Note saved");
      else toast.error(result.error);
    } else {
      const result = await createNote(formData);
      if (result.ok) {
        toast.success("Note created");
        router.push(`/notes?note=${result.id}`);
      } else {
        toast.error(result.error);
      }
    }
  }

  return (
    <form
      action={handleSave}
      className="md:col-span-6 flex h-full min-h-0 min-w-0 flex-col p-6"
    >
      <input type="hidden" name="id" value={note?.id} />

      {/* Mobile action bar */}
      <div className="-mx-2 mb-3 flex items-center border-b pb-3 md:hidden">
        <Link
          href={backHref}
          className="flex items-center gap-1 px-2 text-sm text-muted-foreground"
        >
          <ChevronLeft className="size-4" />
          Go Back
        </Link>
        <div className="ml-auto flex items-center gap-1">
          {note && (
            <MobileNoteActions noteId={note.id} isArchived={note.isArchived} />
          )}
        </div>
      </div>

      {/* Mobile save/cancel row */}
      <div className="mb-3 flex gap-3 md:hidden">
        <Button type="reset" variant="secondary" className="flex-1">
          Cancel
        </Button>
        <SubmitButton className="flex-1">
          {note ? "Save Note" : "Create Note"}
        </SubmitButton>
      </div>

      <textarea
        name="title"
        rows={1}
        defaultValue={note?.title}
        placeholder="Enter a title..."
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        className="field-sizing-content w-full resize-none bg-transparent text-3xl font-bold outline-none placeholder:text-muted-foreground"
      />

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
            <Tag className="size-4" />
            Tags
          </span>
          <textarea
            name="tags"
            rows={1}
            defaultValue={note?.tags.join(", ")}
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            className="field-sizing-content min-w-0 flex-1 resize-none bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            Last edited
          </span>
          <span className="text-muted-foreground">
            {note
              ? note.lastEdited.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Not yet saved"}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <textarea
        name="content"
        placeholder="Start typing your note here..."
        className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        defaultValue={note?.content}
      />

      <Separator className="my-4 hidden md:block" />

      <div className="hidden gap-2 md:flex">
        <SubmitButton>{note ? "Save Note" : "Create Note"}</SubmitButton>
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NoteContent;
