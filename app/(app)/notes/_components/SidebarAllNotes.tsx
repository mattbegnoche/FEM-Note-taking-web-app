"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SidebarAllNotes({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="col-span-3 flex flex-col gap-4 p-6 border-r">
      <Button size="lg" className="w-full">
        <Plus />
        Create New Note
      </Button>
      {children ? (
        <div className="flex flex-col gap-4">{children}</div>
      ) : (
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          You don&apos;t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </div>
      )}
    </div>
  );
}
