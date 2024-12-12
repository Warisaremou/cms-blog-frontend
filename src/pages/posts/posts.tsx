import Header from "@/components/header";
import { Searchbar } from "@/components/searchbar";

export default function Posts() {
  return (
    <div className="board-content">
      <div className="flex flex-col items-center gap-y-8">
        <Header
          title="Writings from our team"
          description="A center for all our ressources & insights"
        />
        <Searchbar placeholder="Search for a post" />
      </div>
    </div>
  );
}
