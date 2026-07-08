import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <Skeleton className="h-20 w-full max-w-xl" />
    </div>
  );
}
