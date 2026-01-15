import { useSummary } from "../../../hooks/useSummary";

import styles from "./TableStyles.module.css";

export default function ByCategoryTable() {
   // hooks
   const { byCategory } = useSummary();

   return (
      <table className={styles.container}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>Category</th>
               <th className={styles.tableHeader}>Total</th>
            </tr>
         </thead>
         <tbody>
            {byCategory.map((category) => (
               <tr key={category.key}>
                  <td className={styles.tableData}>{category.key}</td>
                  <td className={styles.tableData}>
                     ${category.total.toFixed(2)}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
