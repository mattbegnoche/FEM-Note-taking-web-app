"use client";

import { usePathname } from "next/navigation";

function titleFor(pathname: string): string {
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
  return (
    <h1 className="text-2xl font-bold text-foreground">{titleFor(pathname)}</h1>
  );
}
