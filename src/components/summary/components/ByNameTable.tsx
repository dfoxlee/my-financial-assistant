import { useSummary } from "../../../hooks/useSummary";

import styles from "./TableStyles.module.css";

export default function ByNameTable() {
   // hooks
   const { byName } = useSummary();

   return (
      <table className={styles.container}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>Name</th>
               <th className={styles.tableHeader}>Total</th>
            </tr>
         </thead>
         <tbody>
            {byName.map((name) => (
               <tr key={name.key}>
                  <td className={styles.tableData}>{name.key}</td>
                  <td className={styles.tableData}>${name.total.toFixed(2)}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
