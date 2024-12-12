import { Searchbar } from "@/components/searchbar";

export default function Posts() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-8 py-5">
        <div className="flex flex-col items-center gap-y-3">
          <h1 className="text-center text-4xl font-bold md:text-5xl">Writings from our team</h1>
          <p className="text-foreground max-md:text-sm">A center for all our ressources & insights</p>
        </div>
        <Searchbar placeholder="Search for a post" />
      </div>
    </>
  );
}
