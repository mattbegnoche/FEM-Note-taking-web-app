import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteContent from "./_components/NoteContent";
import SidebarRight from "./_components/SidebarRight";
import SidebarAllNotes from "./_components/SidebarAllNotes";
import NoteItem from "./_components/NoteItem";

export default function AllNotes() {
  return (
    <>
      <SidebarAllNotes>
        <NoteItem
          title="React Performance Optimization"
          tags={["Dev", "React"]}
          lastEdited="2024-10-29T10:15:00Z"
          active
        />
        <NoteItem
          title="Japan Travel Planning"
          tags={["Travel", "Personal"]}
          lastEdited="2024-10-28T16:45:00Z"
        />
      </SidebarAllNotes>
      <NoteContent />
      <SidebarRight />
      {/* Mobile Button to Add Notes */}
      <div className="absolute right-6 bottom-20 md:hidden">
        <Button size="icon-lg" className="rounded-full">
          <Plus />
        </Button>
      </div>
    </>
  );
}
