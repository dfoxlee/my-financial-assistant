import { SearchIcon } from "lucide-react";
import { useTransactionStore } from "../../stores/transactionStore";
import StandardBtn from "../shared/StandardBtn";
import StandardInput from "../shared/StandardInput";
import TransactionsTable from "./components/TransactionsTable";
import { useState } from "react";

import styles from "./Transactions.module.css";

export default function Transactions({
   openAssignCategoriesModal,
}: // openEditCategoriesModal,
{
   openAssignCategoriesModal: () => void;
   // openEditCategoriesModal: () => void;
}) {
   // stores
   const transactions = useTransactionStore((store) => store.transactions);
   const setTransactions = useTransactionStore(
      (store) => store.setTransactions
   );

   // states
   const [searchInput, setSearchInput] = useState("");

   // handlers
   const handleClearTransactionsClick = () => {
      setTransactions(null);
   };

   const handleSearchChange = (newSearch: string) => {
      setSearchInput(newSearch);
   };

   return (
      <div>
         <div className={styles.transactionBtnsWrapper}>
            {transactions && (
               <StandardBtn
                  text="Assign Categories"
                  outlined={true}
                  onClick={openAssignCategoriesModal}
               />
            )}
            {/* <StandardBtn
               text="Edit Categories"
               outlined={true}
               onClick={openEditCategoriesModal}
            /> */}
            {/* <CategoryAutoComplete /> */}
            {transactions && (
               <StandardBtn
                  text="Clear Transactions"
                  filled={true}
                  onClick={handleClearTransactionsClick}
                  styleType="danger"
               />
            )}
         </div>
         <div className={styles.transactionSearchWrapper}>
            <StandardInput
               value={searchInput}
               placeholder="Search transactions..."
               onChange={handleSearchChange}
            />
            <SearchIcon className={styles.searchIcon} />
         </div>
         <div className={styles.transactionsTableWrapper}>
            <TransactionsTable searchInput={searchInput} />
         </div>
      </div>
   );
}
