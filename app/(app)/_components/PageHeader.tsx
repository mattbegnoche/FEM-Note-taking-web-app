import Link from "next/link";
import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PageHeader() {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b px-8">
      <h1 className="text-2xl font-bold text-foreground">All Notes</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, content, or tags…"
            className="h-11 pl-9"
          />
        </div>
        <Button variant="ghost" size="icon-lg" asChild>
          <Link href="/settings">
            <Settings className="text-muted-foreground" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;
