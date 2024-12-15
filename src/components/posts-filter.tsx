import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/services/categories/hooks";
import { CategoryList } from "@/types";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setSearchKey: Dispatch<SetStateAction<string>>;
};

export default function PostsFilter({ setSearchKey }: Props) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<CategoryList>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function fetchCategories() {
    getAllCategories()
      .then((response) => {
        setCategories(response);
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
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">
      <div className="">
        <Select>
          <SelectTrigger className="w-48 gap-x-2 max-sm:w-[13rem] lg:w-52">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : (
              categories.data.map((category) => (
                <SelectItem
                  key={category.id_category}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
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
