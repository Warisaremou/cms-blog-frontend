import PostCard from "@/components/cards/post-card";
import { PostLoader } from "@/components/loaders";
import { useToast } from "@/hooks/use-toast";
import { getAllPostsByUser } from "@/services/posts";
import { PostList } from "@/types";
import { useEffect, useState } from "react";

export default function MyPosts() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostList>({
    data: [],
    meta: {
      page: 1,
      per_page: 6,
    },
  });

  function fetchPosts() {
    getAllPostsByUser()
      .then((response) => {
        setPosts(response);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bh-bold">My Posts ({!isLoading && posts.data.length})</h1>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <PostLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Posts List */}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.data
              // ?.filter((post) => post.title.toLowerCase().includes(searchKey.toLowerCase()))
              .map((post) => (
                <PostCard
                  key={post.id_post}
                  post={post}
                  withAction
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
