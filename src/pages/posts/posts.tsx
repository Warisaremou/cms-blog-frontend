import Header from "@/components/header";
import { Searchbar } from "@/components/searchbar";
import PostsListSection from "@/components/sections/posts-list-section";

export default function Posts() {
  return (
    <div className="board-content flex-1">
      <div className="flex flex-col items-center gap-y-8">
        <Header
          title="Writings from our team"
          description="A center for all our ressources & insights"
        />
        <Searchbar placeholder="Search for a post" />
      </div>
      {/* Posts List Section */}
      <PostsListSection />
    </div>
  );
}
