import { useEffect, useRef, useState } from "react";
import StandardBtn from "./StandardBtn";
import { ChevronDown } from "lucide-react";
import StandardInput from "./StandardInput";

import styles from "./StandardDropdown.module.css";

interface StandardDropdownProps {
   style?: React.CSSProperties;
   value: string;
   options: string[];
   onChange: (value: string) => void;
   dropdownName: string;
}

export default function StandardDropdown({
   style,
   value,
   options,
   onChange,
   dropdownName,
}: StandardDropdownProps) {
   // states
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [searchValue, setSearchValue] = useState("");
   const [filteredOptions, setFilteredOptions] = useState(options);

   // refs
   const dropdownRef = useRef<HTMLDivElement>(null);

   // handlers
   const handleChange = (newOption: string) => {
      onChange(newOption);
      setIsDropdownOpen(false);
   };

   // effects
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
         ) {
            setIsDropdownOpen(false);
            setSearchValue("");
            setFilteredOptions(options);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleDropdownToggleClick = () => {
      if (isDropdownOpen) {
         setSearchValue("");
      }
      
      setIsDropdownOpen((prev) => !prev);
      setFilteredOptions(options);
   };

   const handleSearchChange = (value: string) => {
      setSearchValue(value);

      if (value === "") return setFilteredOptions(options);

      setFilteredOptions(
         options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
         )
      );
   };

   return (
      <div className={styles.container} ref={dropdownRef} style={style}>
         <StandardBtn
            style={{
               width: "100%",
            }}
            outlined={true}
            text={value !== "" ? value : dropdownName}
            onClick={handleDropdownToggleClick}
            RightIcon={ChevronDown}
         />
         {isDropdownOpen && (
            <div className={styles.dropdownWrapper}>
               <StandardInput
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search options..."
               />
               <div className={styles.optionsWrapper}>
                  {filteredOptions.map((option) => (
                     <StandardBtn
                        key={option}
                        text={option}
                        onClick={() => handleChange(option)}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
