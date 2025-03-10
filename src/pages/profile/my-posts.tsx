import PostCard from "@/components/cards/post-card";
import { PostLoader } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { getAllPostsByUser } from "@/services/posts";
import { PostList } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-bh-bold">My Posts ({!isLoading && posts.data.length})</h1>
        <Button
          variant="default"
          asChild
          className="md:hidden"
        >
          <Link to={`/posts/${routes.posts.addPost}`}>Share a Post</Link>
        </Button>
      </div>

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
            {posts.data.length > 0 ? (
              posts.data.map((post) => (
                <PostCard
                  key={post.id_post}
                  post={post}
                  withAction
                />
              ))
            ) : (
              <div className="flex flex-col p-2 items-center gap-4 col-span-2">
                <p className="text-primary/50 text-center text-sm font-bh-medium">You have not shared any post yet</p>
                <Button variant="default">
                  <Link to={`/posts/${routes.posts.addPost}`}>Share a Post</Link>
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
