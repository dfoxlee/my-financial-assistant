import { type LucideProps } from "lucide-react";
import { toast } from "react-toastify";
import { useMemo } from "react";

import styles from "./StandardBtn.module.css";

interface StandardBtnProps {
   style?: React.CSSProperties;
   onClick?: () => void;
   LeftIcon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
   >;
   RightIcon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
   >;
   text?: string;
   outlined?: boolean;
   filled?: boolean;
   disabled?: boolean;
   styleType?: "success" | "danger" | "standard";
}

export default function StandardBtn({
   style,
   onClick,
   LeftIcon,
   RightIcon,
   text,
   outlined,
   filled,
   disabled,
   styleType = "standard",
}: StandardBtnProps) {
   // memoized values
   const classNames = useMemo(() => {
      const classes = [styles.btn];

      if (disabled) classes.push(styles.disabled);

      switch (styleType) {
         case "success": {
            if (outlined) {
               classes.push(styles.successOutlined);
            } else if (filled) {
               classes.push(styles.successFilled);
            } else {
               classes.push(styles.success);
            }

            break;
         }
         case "danger": {
            if (outlined) {
               classes.push(styles.dangerOutlined);
            } else if (filled) {
               classes.push(styles.dangerFilled);
            } else {
               classes.push(styles.danger);
            }

            break;
         }
         default: {
            if (outlined) {
               classes.push(styles.standardOutlined);
            } else if (filled) {
               classes.push(styles.standardFilled);
            } else {
               classes.push(styles.standard);
            }

            break;
         }
      }

      return classes.join(" ");
   }, [outlined, filled, disabled, styleType]);

   // handlers
   const handleClick = () => {
      if (onClick) {
         onClick();
      } else {
         toast.info("StandardBtn clicked - no onClick handler provided");
      }
   };
   return (
      <button style={style} onClick={handleClick} className={classNames}>
         {LeftIcon && <LeftIcon size={24} />}
         {text && <span className={styles.text}>{text}</span>}
         {RightIcon && <RightIcon size={24} />}
      </button>
   );
}
