"use client";
import type { Note } from "@/lib/generated/prisma/client";
import { Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateNote } from "../actions";
import SubmitButton from "./SubmitButton";

function NoteContent({ note }: { note: Note | null }) {
  async function handleSave(formData: FormData) {
    const result = await updateNote(formData);
    if (result.ok) toast.success("Note saved");
    else toast.error(result.error);
  }

  return (
    <form action={handleSave} className="col-span-6 flex h-full flex-col p-6">
      <input type="hidden" name="id" value={note?.id} />

      <Input
        name="title"
        defaultValue={note?.title}
        type="text"
        placeholder="Enter a title..."
        className="h-auto border-none px-0 text-2xl font-bold shadow-none focus-visible:ring-0"
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
            {note
              ? note.lastEdited.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Not yet saved"}
          </span>
          <span className="text-muted-foreground">Not yet saved</span>
        </div>
      </div>

      <Separator className="my-4" />

      <textarea
        name="content"
        placeholder="Start typing your note here..."
        className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        defaultValue={note?.content}
      />

      <Separator className="my-4" />

      <div className="flex gap-2">
        <SubmitButton>Save Note</SubmitButton>
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NoteContent;
