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
      const newCategories = categories
         ? [...categories, `New Category ${categories.length + 1}`]
         : [`New Category 1`];

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
