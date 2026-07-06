"use client";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

function titleFor(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
): string {
  if (pathname.startsWith("/notes/search")) {
    const q = searchParams.get("q");
    return q ? `Showing results for: ${searchParams.get("q")}` : "Search";
  }

  if (pathname.startsWith("/notes/archived")) return "Archived Notes";
  if (pathname.startsWith("/notes/tags/")) {
    const tag = decodeURIComponent(pathname.split("/").pop() ?? "");
    return `Notes Tagged: ${tag}`;
  }
  if (pathname.startsWith("/settings")) return "Settings";
  return "All Notes";
}

export default function PageTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <h1 className="text-2xl font-bold text-foreground">
      {titleFor(pathname, searchParams)}
    </h1>
  );
}
