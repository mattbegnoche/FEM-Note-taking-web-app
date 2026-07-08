"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { archiveNote, deleteNote, unarchiveNote } from "../actions";

export function useNoteActions(noteId: string, isArchived: boolean) {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();

  const listPath = isArchived ? "/notes/archived" : "/notes";

  async function confirmArchive() {
    const result = isArchived
      ? await unarchiveNote(noteId)
      : await archiveNote(noteId);
    setArchiveOpen(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(isArchived ? "Note restored" : "Note archived");
    router.push(listPath);
  }

  async function confirmDelete() {
    const result = await deleteNote(noteId);
    setDeleteOpen(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Note deleted");
    router.push(listPath);
  }

  return {
    archiveOpen,
    setArchiveOpen,
    deleteOpen,
    setDeleteOpen,
    confirmArchive,
    confirmDelete,
  };
}
