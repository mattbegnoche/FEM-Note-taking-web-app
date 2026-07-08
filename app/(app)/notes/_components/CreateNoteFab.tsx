"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateNoteFab() {
  const searchParams = useSearchParams();

  // Hide while a note is open or being drafted — the editor has its own
  // save flow, and a floating create button next to it reads as noise.
  if (searchParams.get("note") || searchParams.get("new")) return null;

  return (
    <div className="fixed right-6 bottom-20 md:hidden">
      <Button size="icon-lg" className="size-14 rounded-full shadow-lg" asChild>
        <Link href="/notes?new=true">
          <Plus className="size-7" />
          <span className="sr-only">Create new note</span>
        </Link>
      </Button>
    </div>
  );
}
