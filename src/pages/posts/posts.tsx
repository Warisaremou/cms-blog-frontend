import Header from "@/components/header";
import { Searchbar } from "@/components/searchbar";
import PostsListSection from "@/components/sections/posts-list-section";
import { usePosts } from "@/contexts/posts/hook";
import { useState } from "react";

export default function Posts() {
  const [searchKey, setSearchKey] = useState("");
  const { isLoading, posts } = usePosts();

  return (
    <div className="board-content flex-1 max-lg:space-y-5 space-y-10">
      <div className="flex flex-col items-center gap-y-8">
        <Header
          title="Writings from the community"
          description="A center for all our ressources & insights"
        />
        <Searchbar
          placeholder="Search for a post"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      {/* Posts List Section */}
      <PostsListSection
        searchKey={searchKey}
        isLoading={isLoading}
        posts={posts}
      />
    </div>
  );
}
