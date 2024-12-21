import { Skeleton } from "@/components/ui/skeleton";

export default function PostDataLoader() {
  return (
    <div className="relative flex flex-col gap-y-4 rounded-2xl border border-slate-200/50 bg-background p-2.5">
      <Skeleton className="h-56 rounded-xl" />
      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-full" />
        <div className="flex items-center gap-x-2.5 justify-between">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  );
}
