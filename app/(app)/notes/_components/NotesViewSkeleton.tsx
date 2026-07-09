import { Skeleton } from "@/components/ui/skeleton";

function NoteItemSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-b pb-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export default function NotesViewSkeleton() {
  return (
    <>
      <div className="md:col-span-3 flex flex-col gap-4 border-r p-6">
        <Skeleton className="hidden h-10 w-full md:block" />
        {Array.from({ length: 6 }).map((_, i) => (
          <NoteItemSkeleton key={i} />
        ))}
      </div>

      <div className="hidden flex-col gap-4 p-6 md:col-span-6 md:flex">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="mt-4 flex-1" />
      </div>
    </>
  );
}
