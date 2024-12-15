import Header from "@/components/header";
import { Searchbar } from "@/components/searchbar";
import PostsListSection from "@/components/sections/posts-list-section";
import { useToast } from "@/hooks/use-toast";
import { getAllPosts } from "@/services/posts/hooks";
import { PostList } from "@/types";
import { useEffect, useState } from "react";

export default function Posts() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostList>({
    data: [],
    meta: {
      page: 1,
      per_page: 6,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function fetchPosts() {
    getAllPosts()
      .then((response) => {
        setPosts(response);
        setIsLoading(false);
        // setTimeout(() => {}, 2000);
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
    <div className="board-content flex-1 max-sm:space-y-5">
      <div className="flex flex-col items-center gap-y-8">
        <Header
          title="Writings from our team"
          description="A center for all our ressources & insights"
        />
        <Searchbar placeholder="Search for a post" />
      </div>
      {/* Posts List Section */}
      <PostsListSection
        isLoading={isLoading}
        posts={posts}
      />
    </div>
  );
}
