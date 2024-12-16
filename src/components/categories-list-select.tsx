import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/services/categories/hooks";
import { CategoryList } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
};

export default function CategoriesListSelect({ placeholder }: Props) {
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
    <Select>
      <SelectTrigger className="w-48 gap-x-2 max-sm:w-[13rem] lg:w-52">
        <SelectValue placeholder={placeholder} />
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
  );
}
