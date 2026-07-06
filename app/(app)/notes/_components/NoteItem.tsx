interface NoteItemProps {
  title: string;
  tags: string[];
  lastEdited: string;
  active?: boolean;
}

function NoteItem({ title, tags, lastEdited, active = false }: NoteItemProps) {
  const formattedDate = new Date(lastEdited).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={
        active
          ? "flex flex-col gap-3 rounded-lg bg-muted p-4"
          : "flex flex-col gap-3 border-b pb-4"
      }
    >
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={
              active
                ? "rounded-md bg-background px-2 py-0.5 text-xs text-secondary-foreground"
                : "rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            }
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{formattedDate}</span>
    </div>
  );
}

export default NoteItem;
