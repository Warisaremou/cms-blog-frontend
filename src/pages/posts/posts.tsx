import Header from "@/components/header";
import { Searchbar } from "@/components/searchbar";

export default function Posts() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-8 py-5">
        <Header
          title="Writings from our team"
          description="A center for all our ressources & insights"
        />
        <Searchbar placeholder="Search for a post" />
      </div>
    </>
  );
}
