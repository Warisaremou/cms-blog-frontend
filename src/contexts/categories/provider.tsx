import { CategoriesContext } from "@/contexts/categories/context";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/services/categories";
import { CategoryList } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function CategoriesProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<CategoryList>({
    data: [],
  });
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);

  function fetchCategories() {
    getAllCategories()
      .then((response) => {
        setCategories(response);
        setIsLoadingCategories(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsLoadingCategories(false);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        isLoadingCategories,
        categories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
