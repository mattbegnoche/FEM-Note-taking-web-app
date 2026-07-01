import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AllNotes() {
  return (
    <div>
      <div className="absolute right-6 bottom-20 md:hidden">
        <Button size="icon-lg" className="rounded-full">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
