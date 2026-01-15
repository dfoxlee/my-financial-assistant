import CategoryTotalPie from "./components/CategoryTotalPie";
import TotalSpentPerDayLine from "./components/TotalSpentPerDayLine";

import styles from "./Charts.module.css";
import TransactionNameBar from "./components/TransactionNameBar";
import NameTotalPie from "./components/NameTotalPie";

export default function Charts() {
   return (
      <div className={styles.container}>
         <TotalSpentPerDayLine />
         <div className={styles.pieChartsWrapper}>
            <CategoryTotalPie />
            <NameTotalPie />
         </div>
         <TransactionNameBar />
      </div>
   );
}
