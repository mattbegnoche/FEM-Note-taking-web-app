import Link from "next/link";
import { Tag } from "lucide-react";
import { getTags } from "@/lib/notes";

export default async function TagsPage() {
  const rows = await getTags();
  const tags = [...new Set(rows.flatMap((row) => row.tags))].sort();

  return (
    <div className="flex flex-col px-6 md:col-span-9">
      {tags.length > 0 ? (
        <ul className="divide-y">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/notes/tags/${encodeURIComponent(tag)}`}
                className="flex items-center gap-3 py-4 hover:text-foreground/80"
              >
                <Tag className="size-5 text-muted-foreground" />
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          No tags yet. Add tags to your notes to see them here.
        </div>
      )}
    </div>
  );
}
