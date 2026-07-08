"use client";

import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoteActionDialogs from "./NoteActionDialogs";
import { useNoteActions } from "./useNoteActions";

function MobileNoteActions({
  noteId,
  isArchived,
}: {
  noteId: string;
  isArchived: boolean;
}) {
  const actions = useNoteActions(noteId, isArchived);

  return (
    <>
      {/* type="button" is load-bearing: these render inside the note form,
          and a button without a type submits it. */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => actions.setDeleteOpen(true)}
      >
        <Trash2 />
        <span className="sr-only">Delete note</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => actions.setArchiveOpen(true)}
      >
        {isArchived ? <RotateCcw /> : <Archive />}
        <span className="sr-only">
          {isArchived ? "Restore note" : "Archive note"}
        </span>
      </Button>
      <NoteActionDialogs isArchived={isArchived} {...actions} />
    </>
  );
}

export default MobileNoteActions;
