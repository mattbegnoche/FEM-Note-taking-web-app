"use client";

import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoteActionDialogs from "./NoteActionDialogs";
import { useNoteActions } from "./useNoteActions";

function NoteActionsPanel({
  noteId,
  isArchived,
}: {
  noteId: string;
  isArchived: boolean;
}) {
  const actions = useNoteActions(noteId, isArchived);

  return (
    <div className="hidden md:flex md:col-span-3 flex-col gap-4 border-l p-6">
      <Button
        variant="outline"
        size="lg"
        className="w-full justify-start"
        onClick={() => actions.setArchiveOpen(true)}
      >
        {isArchived ? <RotateCcw /> : <Archive />}
        {isArchived ? "Restore Note" : "Archive Note"}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full justify-start"
        onClick={() => actions.setDeleteOpen(true)}
      >
        <Trash2 />
        Delete Note
      </Button>

      <NoteActionDialogs isArchived={isArchived} {...actions} />
    </div>
  );
}

export default NoteActionsPanel;
