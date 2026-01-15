import { Plus } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import StandardBtn from "../shared/StandardBtn";
import Category from "./components/Category";
import styles from "./EditCategoriesModal.module.css";

export default function EditCategoriesModal({
   closeEditCategoriesModal,
}: {
   closeEditCategoriesModal: () => void;
}) {
   // hooks
   const { categories, setCategories } = useCategories();

   // handlers
   const handleAddCategoryClick = () => {
      const maxId =
         categories?.reduce((acc, curr) => {
            const id = parseInt(curr.split(" ")[2]) || 0;
            return id > acc ? id : acc;
         }, 0) || 0;

      const newCategory = {
         id: maxId + 1,
         name: `New Category ${maxId + 1}`,
      };

      const newCategories = categories
         ? [newCategory, ...categories]
         : [newCategory];
         
      setCategories(newCategories);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardBtn
               text="Close"
               filled={true}
               onClick={closeEditCategoriesModal}
            />
            <h3 className={styles.title}>Edit Categories</h3>
            <StandardBtn
               style={{
                  margin: "10px auto 0",
               }}
               LeftIcon={Plus}
               text="Category"
               outlined={true}
               onClick={handleAddCategoryClick}
            />
            <div className={styles.categoriesWrapper}>
               {categories?.map((c) => (
                  <Category key={c} category={c} />
               ))}
            </div>
         </div>
      </div>
   );
}
