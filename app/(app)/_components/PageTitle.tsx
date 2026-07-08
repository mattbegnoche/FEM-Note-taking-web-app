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
  if (pathname === "/notes/tags") return "Tags";
  if (pathname.startsWith("/notes/tags/")) {
    const tag = decodeURIComponent(pathname.split("/").pop() ?? "");
    return `Notes Tagged: ${tag}`;
  }
  if (pathname.startsWith("/settings")) return "Settings";
  return "All Notes";
}

export default function PageTitle({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (mobile && (searchParams.get("note") || searchParams.get("new"))) {
    return null;
  }

  // Settings subpages render their own heading plus a back link on mobile,
  // so the layout-level title only shows on the settings index screen.
  if (mobile && pathname.startsWith("/settings/")) {
    return null;
  }

  // On mobile the search screen has its own input + helper text, so the
  // title stays a plain "Search" instead of echoing the query.
  const title =
    mobile && pathname.startsWith("/notes/search")
      ? "Search"
      : titleFor(pathname, searchParams);

  return <h1 className="text-2xl font-bold text-foreground">{title}</h1>;
}
