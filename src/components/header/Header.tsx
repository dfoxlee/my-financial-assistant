import { useTransactionStore } from "../../stores/transactionStore";
import CSVUploader from "./components/CSVUploader";
import TemplateDownloader from "./components/TemplateDownloader";

import styles from "./Header.module.css";

export default function Header() {
   // stores
   const transactions = useTransactionStore((store) => store.transactions);

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
               <h1 className={styles.title}>My Financial Assistant</h1>
               <TemplateDownloader />
            </div>
            {!transactions && (
               <>
                  <p className={styles.subTitle}>
                     Welcome to finance tracker an easy way to categorize and
                     visualize your finances.
                  </p>
                  <CSVUploader />
                  <p className={styles.instructions}>
                     Simply download our CSV transactions template, paste in
                     your data, and then upload below.
                  </p>
                  <p className={styles.instructions}>
                     All data is local to your browser, meaning if you have the
                     template and don't want the AI features, you can use this
                     app completely offline!!
                  </p>
               </>
            )}
         </div>
      </div>
   );
}
