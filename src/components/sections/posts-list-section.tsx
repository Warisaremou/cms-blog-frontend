import PostCard from "@/components/cards/post-card";
import { PostLoader } from "@/components/loaders";
import { Pagination } from "@/components/pagers";
import PostsFilter from "@/components/posts-filter";
import { PostList } from "@/types";
import { useTransition } from "react";
import { useNavigate } from "react-router";

type Props = {
  isLoading: boolean;
  posts: PostList;
};

export default function PostsListSection({ isLoading, posts }: Props) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col space-y-8">
      {/* Posts Filter */}
      <PostsFilter />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <PostLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Posts List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.data?.map((post) => (
              <PostCard
                key={post.id_post}
                post={post}
              />
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            pageCount={posts.meta.per_page}
            page={`${posts.meta.page}`}
            navigate={navigate}
            pathname="/"
            isPending={isPending}
            startTransition={startTransition}
          />
        </>
      )}
    </div>
  );
}
