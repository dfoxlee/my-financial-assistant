import { useSummary } from "../../../hooks/useSummary";

import styles from "./TableStyles.module.css";

export default function ByDateTable() {
   // hooks
   const { byDate } = useSummary();

   return (
      <table className={styles.container}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>Date</th>
               <th className={styles.tableHeader}>Total</th>
            </tr>
         </thead>
         <tbody>
            {byDate.map((date) => (
               <tr key={date.key}>
                  <td className={styles.tableData}>{date.key}</td>
                  <td className={styles.tableData}>${date.total.toFixed(2)}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
