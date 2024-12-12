import PostCard from "@/components/cards/post-card";
import PostsFilter from "@/components/posts-filter";

export default function PostsListSection() {
  return (
    <div className="flex flex-col space-y-8">
      <PostsFilter />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
    </div>
  );
}
