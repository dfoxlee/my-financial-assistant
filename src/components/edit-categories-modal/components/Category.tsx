import { Trash2 } from "lucide-react";
import StandardBtn from "../../shared/StandardBtn";
import StandardInput from "../../shared/StandardInput";
import styles from "./Category.module.css";
import type { CategoryType } from "../../../types/categoryTypes";
import { useCategories } from "../../../hooks/useCategories";

export default function Category({ category }: { category: CategoryType }) {
   // stores
   const { updateCategory, deleteCategory } = useCategories();

   // handlers
   const handleCategoryChange = (newName: string) => {
      updateCategory({ ...category, name: newName });
   };

   const handleDeleteCategoryClick = () => {
      deleteCategory(category.id);
   };

   return (
      <div className={styles.container}>
         <StandardInput value={category.name} onChange={handleCategoryChange} />
         <StandardBtn LeftIcon={Trash2} onClick={handleDeleteCategoryClick} />
      </div>
   );
}
