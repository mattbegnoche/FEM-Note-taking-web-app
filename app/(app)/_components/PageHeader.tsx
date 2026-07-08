import Link from "next/link";
import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "./PageTitle";
import SearchForm from "./SearchForm";

function PageHeader() {
  return (
    <div className="hidden md:flex h-20 w-full items-center justify-between border-b px-8">
      <PageTitle />
      <div className="flex items-center gap-4">
        <SearchForm />
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
