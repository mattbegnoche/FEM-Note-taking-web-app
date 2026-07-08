import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function NoteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Mobile Button to Add Notes */}
      <div className="fixed right-6 bottom-20 md:hidden">
        <Button size="icon-lg" className="rounded-full shadow-lg" asChild>
          <Link href="/notes?new=true">
            <Plus />
            <span className="sr-only">Create new note</span>
          </Link>
        </Button>
      </div>
      {children}
    </>
  );
}
