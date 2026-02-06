import { Trash2 } from "lucide-react";
import StandardBtn from "../../shared/StandardBtn";
import StandardInput from "../../shared/StandardInput";
import styles from "./Category.module.css";
import { useCategories } from "../../../hooks/useCategories";

export default function Category({ category }: { category: string }) {
   // stores
   const { categories, setCategories } = useCategories();

   // handlers
   const handleCategoryChange = (newName: string) => {
      const updatedCategories = categories?.map((c) =>
         c === category ? newName : c,
      );

      if (!updatedCategories) return;

      setCategories(updatedCategories);
   };

   const handleDeleteCategoryClick = () => {
      const updatedCategories = categories?.filter((c) => c !== category);

      if (!updatedCategories) return;

      setCategories(updatedCategories);
   };

   return (
      <div className={styles.container}>
         <StandardInput value={category} onChange={handleCategoryChange} />
         <StandardBtn LeftIcon={Trash2} onClick={handleDeleteCategoryClick} />
      </div>
   );
}
