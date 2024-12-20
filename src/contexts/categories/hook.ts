import { CategoriesContext } from "@/contexts/categories/context";
import { useContext } from "react";

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be wrapped  in a <CategoriesProvider />");
  }

  return context;
};
