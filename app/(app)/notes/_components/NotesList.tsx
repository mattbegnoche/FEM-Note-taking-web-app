"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

export default function NotesList({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "md:col-span-3 flex flex-col gap-4 p-6 border-r overflow-y-auto",
        className,
      )}
    >
      <Button size="lg" className="hidden w-full md:flex" asChild>
        <Link href="/notes?new=true">
          <Plus />
          Create New Note
        </Link>
      </Button>
      {children}
    </div>
  );
}
