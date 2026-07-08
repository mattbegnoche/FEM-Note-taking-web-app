"use client";

import { Archive, RotateCcw, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import type { useNoteActions } from "./useNoteActions";

type NoteActionDialogsProps = ReturnType<typeof useNoteActions> & {
  isArchived: boolean;
};

function NoteActionDialogs({
  isArchived,
  archiveOpen,
  setArchiveOpen,
  deleteOpen,
  setDeleteOpen,
  confirmArchive,
  confirmDelete,
}: NoteActionDialogsProps) {
  return (
    <>
      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        icon={isArchived ? RotateCcw : Archive}
        title={isArchived ? "Restore Note" : "Archive Note"}
        description={
          isArchived
            ? "Are you sure you want to restore this note? You can find it in the All Notes section and archive it anytime."
            : "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        }
        confirmLabel={isArchived ? "Restore Note" : "Archive Note"}
        variant="default"
        onConfirm={confirmArchive}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        icon={Trash2}
        title="Delete Note"
        description="Are you sure you want to permanently delete this note? This action cannot be undone."
        confirmLabel="Delete Note"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default NoteActionDialogs;
