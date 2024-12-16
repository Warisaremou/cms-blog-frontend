import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/services/categories/hooks";
import { CategoryList } from "@/types";
import { forwardRef, useEffect, useState } from "react";
import { InputProps } from "./ui/input";

// type Props = {
//   placeholder: string;
//   className?: string;
//   ref?:
// };

const CategoriesListSelect = forwardRef<HTMLInputElement, InputProps>(({ className, onChange, ...props }, ref) => {
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
      <SelectTrigger className={cn(className)}>
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent
        onChange={onChange}
        ref={ref}
      >
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
});

CategoriesListSelect.displayName = "CategoriesListSelect";

export default CategoriesListSelect;
