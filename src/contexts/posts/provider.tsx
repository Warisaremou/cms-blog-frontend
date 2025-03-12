import { PostsContext } from "@/contexts/posts/context";
import { useToast } from "@/hooks/use-toast";
import { getAllPosts } from "@/services/posts";
import { PostList } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function PostsProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [refetch, setRefetch] = useState(false);
  const [posts, setPosts] = useState<PostList>({
    data: [],
    meta: {
      page: 1,
      per_page: 6,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  function fetchPosts() {
    getAllPosts()
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
  }, [refetch]);

  const refresh = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <PostsContext.Provider
      value={{
        isLoading,
        posts,
        refresh,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
