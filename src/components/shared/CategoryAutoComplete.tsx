import { ChevronDown, Trash2 } from "lucide-react";
import styles from "./CategoryAutoComplete.module.css";
import StandardBtn from "./StandardBtn";
import { useCategories } from "../../hooks/useCategories";
import { useState, type ChangeEvent } from "react";

export default function CategoryAutoComplete({
   value,
   onChange,
}: {
   value: string;
   onChange: (newValue: string) => void;
}) {
   // hooks
   const { categories, setCategories } = useCategories();

   // states
   const [filteredCategories, setFilteredCategories] = useState(
      categories || []
   );
   const [inputValue, setInputValue] = useState<string>(value || "");
   const [dropdownOpen, setDropdownOpen] = useState(false);

   // handlers
   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      setInputValue(inputValue);
   };

   const handleFocus = () => {
      setFilteredCategories(
         categories?.filter((c) =>
            c.toLowerCase().includes(inputValue.toLowerCase())
         ) || []
      );

      setDropdownOpen(true);
   };

   const handleBlur = () => {
      if (inputValue && inputValue !== value) {
         onChange(inputValue);

         if (categories && !categories.includes(inputValue)) {
            setCategories([...categories, inputValue]);
         }
      }
      setDropdownOpen(false);

      setFilteredCategories(categories ?? []);
   };

   return (
      <div className={styles.container}>
         <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
         />
         <StandardBtn LeftIcon={ChevronDown} />
         {dropdownOpen && (
            <div className={styles.dropdownWrapper}>
               {filteredCategories.map((category) => (
                  <div
                     key={category}
                     className={
                        category === value
                           ? `${styles.dropdownItem}`
                           : styles.dropdownItem
                     }
                  >
                     <StandardBtn text={category} />
                     <StandardBtn LeftIcon={Trash2} />
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
