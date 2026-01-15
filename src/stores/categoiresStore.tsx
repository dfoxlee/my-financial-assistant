import { create } from "zustand";

interface CategoriesStoreType {
   categories: string[] | null;

   setCategories: (categories: string[]) => void;
}

export const useCategoriesStore = create<CategoriesStoreType>((set) => ({
   categories: null,

   setCategories: (categories) => set({ categories }),
}));
