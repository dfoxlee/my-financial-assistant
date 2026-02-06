import { useMemo, type ChangeEvent, type Ref } from "react";
import styles from "./StandardInput.module.css";

interface StandardInputProps {
   value: string;
   onChange: (value: string) => void;
   onBlur?: () => void;
   placeholder?: string;
   style?: React.CSSProperties;
   size?: "small" | "medium" | "large";
   styleType?: "success" | "danger" | "standard";
   ref?: Ref<HTMLInputElement>;
}

export default function StandardInput({
   value,
   onChange,
   onBlur,
   placeholder,
   style,
   size,
   styleType = "standard",
   ref,
}: StandardInputProps) {
   // memoized values
   const classNames = useMemo(() => {
      const classes = [styles.input];

      if (!size) {
         classes.push(styles.medium);
      }

      switch (styleType) {
         case "success":
            classes.push(styles.success);
            break;
         case "danger":
            classes.push(styles.danger);
            break;
         case "standard":
            classes.push(styles.standard);
            break;
      }

      switch (size) {
         case "small":
            classes.push(styles.small);
            break;
         case "medium":
            classes.push(styles.medium);
            break;
         case "large":
            classes.push(styles.large);
            break;
      }

      return classes.join(" ");
   }, [size, styleType]);

   // handlers
   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
   };

   const handleBlur = () => {
      if (onBlur) {
         onBlur();
      }
   };

   return (
      <input
         className={classNames}
         style={style}
         value={value}
         onChange={handleOnChange}
         onBlur={handleBlur}
         placeholder={placeholder}
         ref={ref}
      />
   );
}
