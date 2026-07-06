"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (!pathname.startsWith("/notes/search")) setValue("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next); // ← your stray line lives here, and only here

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const q = next.trim();
      router.replace(
        q ? `/notes/search?q=${encodeURIComponent(q)}` : "/notes/search",
      );
    }, 300);
  }

  return (
    <form action="/notes/search" className="relative w-72">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search by title, content, or tags…"
        className="h-11 pl-9"
      />
    </form>
  );
}

export default SearchForm;
