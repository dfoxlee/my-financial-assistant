import { useEffect } from "react";
import { useCategoriesStore } from "../stores/categoiresStore";
import { initialCategories } from "../constants/initialCategories";

export const useCategories = () => {
   // stores
   const categories = useCategoriesStore((store) => store.categories);
   const setCategories = useCategoriesStore((store) => store.setCategories);

   // effects
   useEffect(() => {
      if (!categories) {
         setCategories(initialCategories.sort((a, b) => a.localeCompare(b)));
      }
   }, [categories]);

   return { categories, setCategories };
};
