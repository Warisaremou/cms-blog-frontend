import PostCard from "@/components/cards/post-card";
import { PostLoader } from "@/components/loaders";
import { PostList } from "@/types";

type Props = {
  searchKey: string;
  isLoading: boolean;
  posts: PostList;
};

export default function PostsListSection({ searchKey, isLoading, posts }: Props) {
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <PostLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Posts List */}
          {posts.data.length <= 0 ? (
            <p className="text-center font-bh-medium text-primary/50">Not Post added</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.data
                ?.filter((post) => post.title.toLowerCase().includes(searchKey.toLowerCase()))
                .map((post) => (
                  <PostCard
                    key={post.id_post}
                    post={post}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
