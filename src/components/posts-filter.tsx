import CategoriesListSelect from "@/components/categories-list-select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSearchKey: Dispatch<SetStateAction<string>>;
};

export default function PostsFilter({ setSearchKey }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">
      <div className="">
        <CategoriesListSelect placeholder="Filter by category" />
      </div>

      <Button
        variant="destructive"
        className="gap-x-1"
        onClick={() => setSearchKey("")}
      >
        <Trash2 className="size-4" />
        <span className="hidden md:flex">Clear filters</span>
      </Button>
    </div>
  );
}
