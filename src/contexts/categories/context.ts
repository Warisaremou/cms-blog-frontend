import { CategoryList } from "@/types";
import { createContext } from "react";

const CategoriesContext = createContext<{
  isLoadingCategories: boolean;
  categories: CategoryList;
}>({
  isLoadingCategories: true,
  categories: {
    data: [],
  },
});

export { CategoriesContext };
