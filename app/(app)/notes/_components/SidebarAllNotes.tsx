"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function SidebarAllNotes({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="col-span-3 flex flex-col gap-4 p-6 border-r overflow-y-auto">
      <Button size="lg" className="w-full" asChild>
        <Link href="/notes?new=true">
          <Plus />
          Create New Note
        </Link>
      </Button>
      {children}
    </div>
  );
}
