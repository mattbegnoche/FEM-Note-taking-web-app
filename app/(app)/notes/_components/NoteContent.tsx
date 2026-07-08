"use client";
import type { Note } from "@/lib/generated/prisma/client";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      className="md:col-span-6 flex h-full min-h-0 flex-col p-6"
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
          <Button type="reset" variant="ghost" size="sm">
            Cancel
          </Button>
          <SubmitButton variant="ghost" size="sm" className="text-primary">
            Save Note
          </SubmitButton>
        </div>
      </div>

      <Input
        name="title"
        defaultValue={note?.title}
        type="text"
        placeholder="Enter a title..."
        className="h-auto rounded-none border-none bg-transparent px-0 text-3xl font-bold shadow-none focus-visible:ring-0 md:text-3xl dark:bg-transparent"
      />

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground">
            <Tag className="size-4" />
            Tags
          </span>
          <Input
            name="tags"
            defaultValue={note?.tags.join(", ")}
            type="text"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="h-auto flex-1 border-none px-0 shadow-none focus-visible:ring-0"
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
