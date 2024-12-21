import { Skeleton } from "@/components/ui/skeleton";

export default function PostDataLoader() {
  return (
    <div className="board-content grid max-lg:grid-cols-1 grid-cols-3 gap-8 ">
      <Skeleton className="min-h-[48rem] rounded-xl lg:col-span-2" />
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}
