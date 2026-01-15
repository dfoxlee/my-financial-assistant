import StandardBtn from "../shared/StandardBtn";
import { useSummary } from "../../hooks/useSummary";
import { useTransactionStore } from "../../stores/transactionStore";
import { useCategories } from "../../hooks/useCategories";
import StandardDropdown from "../shared/StandardDropdown";

import styles from "./AssignCategoriesModal.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { fetchAiCategorizedSuggestions } from "../../services/transactionServices";

interface AssignCategoriesModalProps {
   closeAssignCategoriesModal: () => void;
}

export default function AssignCategoriesModal({
   closeAssignCategoriesModal,
}: AssignCategoriesModalProps) {
   // hooks
   const { uniqueNames } = useSummary();
   const { categories } = useCategories();

   // states
   const [isAiLoading, setIsAiLoading] = useState(false);

   // stores
   const transactions = useTransactionStore((store) => store.transactions);
   const categorizedTransactions = useTransactionStore(
      (store) => store.categorizedTransactions
   );
   const setTransactions = useTransactionStore(
      (store) => store.setTransactions
   );
   const setCategorizedTransactions = useTransactionStore(
      (store) => store.setCategorizedTransactions
   );

   // handlers
   const handleCategoryChange = (name: string, newCategory: string) => {
      if (
         !categorizedTransactions.includes({
            category: newCategory,
            name: name,
         })
      ) {
         setCategorizedTransactions([
            ...categorizedTransactions,
            { category: newCategory, name: name },
         ]);
      }

      const updatedTransactions = transactions?.map((tx) => {
         if (tx.name === name) {
            return { ...tx, category: newCategory };
         }

         return tx;
      });

      if (updatedTransactions) {
         setTransactions(updatedTransactions);
      }
   };

   const handleAiClick = async () => {
      if (!transactions || transactions.length === 0) return;

      try {
         setIsAiLoading(true);

         const response = await fetchAiCategorizedSuggestions(uniqueNames);

         // setTransactions(response.transactions);
         console.log(response);
      } catch (error) {
         console.error(error);

         toast.error(
            "An error occurred while trying to suggest categories. Please try again."
         );
      } finally {
         setIsAiLoading(false);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardBtn
               text="Close"
               filled={true}
               onClick={closeAssignCategoriesModal}
            />
            <div className={styles.titleWrapper}>
               <h3 className={styles.columnTitle}>Assign Categories</h3>
               <StandardBtn
                  text="Let Our AI Assistant Suggest Categories"
                  filled={true}
                  onClick={handleAiClick}
                  disabled={isAiLoading}
               />
            </div>
            <div className={styles.categorySelectorWrapper}>
               <table className={styles.tableWrapper}>
                  <thead>
                     <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Category</th>
                     </tr>
                  </thead>
                  <tbody>
                     {uniqueNames.map((name) => (
                        <tr key={name}>
                           <td className={styles.tableData}>{name}</td>
                           <td className={styles.tableData}>
                              <StandardDropdown
                                 value={
                                    categorizedTransactions.find(
                                       (ct) => ct.name === name
                                    )?.category ?? ""
                                 }
                                 dropdownName="..."
                                 options={categories || []}
                                 onChange={(newValue: string) =>
                                    handleCategoryChange(name, newValue)
                                 }
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
