"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { archiveNote, deleteNote } from "../actions";
import { useState } from "react";
import { Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";

function SidebarRight({ noteId }: { noteId: string }) {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="col-span-3 flex flex-col gap-4 border-l p-6">
      <Button
        variant="outline"
        size="lg"
        className="w-full justify-start"
        onClick={() => setArchiveOpen(true)}
      >
        <Archive />
        Archive Note
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full justify-start"
        onClick={() => setDeleteOpen(true)}
      >
        <Trash2 />
        Delete Note
      </Button>

      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        icon={Archive}
        title="Archive Note"
        description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        confirmLabel="Archive Note"
        variant="default"
        onConfirm={async () => {
          await archiveNote(noteId);
          setArchiveOpen(false);
          toast.success("Note archived");
          router.push("/notes");
        }}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        icon={Trash2}
        title="Delete Note"
        description="Are you sure you want to permanently delete this note? This action cannot be undone."
        confirmLabel="Delete Note"
        variant="destructive"
        onConfirm={async () => {
          await deleteNote(noteId);
          setDeleteOpen(false);
          toast.success("Note deleted");
          router.push("/notes");
        }}
      />
    </div>
  );
}

export default SidebarRight;
