"use client";

import { useState } from "react";
import { Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";

function SidebarRight() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
        onConfirm={() => setArchiveOpen(false)}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        icon={Trash2}
        title="Delete Note"
        description="Are you sure you want to permanently delete this note? This action cannot be undone."
        confirmLabel="Delete Note"
        variant="destructive"
        onConfirm={() => setDeleteOpen(false)}
      />
    </div>
  );
}

export default SidebarRight;
