import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/services/categories";
import { CategoryList } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: any;
};

export default function CategoriesListSelect({ placeholder, className, onValueChange }: Props) {
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
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn(className)}>
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
