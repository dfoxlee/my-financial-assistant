import StandardInput from "../../shared/StandardInput";
import StandardBtn from "../../shared/StandardBtn";
import {
   ArrowDown01,
   ArrowDownAz,
   ArrowDownZa,
   ArrowUp01,
   ArrowUpAZ,
   CalendarArrowDown,
   CalendarArrowUp,
   DollarSign,
   Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTransactionStore } from "../../../stores/transactionStore";
import { useCategories } from "../../../hooks/useCategories";
import StandardDropdown from "../../shared/StandardDropdown";

import styles from "./TransactionsTable.module.css";

export default function TransactionsTable({
   searchInput,
}: {
   searchInput: string;
}) {
   // hooks
   const { categories } = useCategories();

   // stores
   const transactions = useTransactionStore((store) => store.transactions);
   const setTransactions = useTransactionStore(
      (store) => store.setTransactions
   );
   const categorizedTransactions = useTransactionStore(
      (store) => store.categorizedTransactions
   );
   const setCategorizedTransactions = useTransactionStore(
      (store) => store.setCategorizedTransactions
   );

   // states
   const [filteredTransactions, setFilteredTransactions] = useState([]);

   // effects
   useEffect(() => {
      if (!transactions) return;

      if (searchInput.trim() === "") {
         setFilteredTransactions(transactions);
         return;
      }

      const lowercasedSearchInput = searchInput.toLowerCase();

      setFilteredTransactions(
         transactions.filter((transaction) => {
            return (
               transaction.name.toLowerCase().includes(lowercasedSearchInput) ||
               transaction.description
                  .toLowerCase()
                  .includes(lowercasedSearchInput) ||
               transaction.category
                  ?.toLowerCase()
                  .includes(lowercasedSearchInput)
            );
         })
      );
   }, [searchInput, transactions]);

   const [sorts, setSorts] = useState<{
      dateDir: "asc" | "desc" | null;
      nameDir: "asc" | "desc" | null;
      amountDir: "asc" | "desc" | null;
      categoryDir: "asc" | "desc" | null;
   }>({
      dateDir: "desc",
      nameDir: null,
      amountDir: null,
      categoryDir: null,
   });

   // handlers
   const handleTransactionCategoryChange = ({
      id,
      category,
   }: {
      id: number;
      category: string;
   }) => {
      if (!transactions) return;

      const transaction = transactions.find((t) => t.id === id);

      if (!transaction) return;

      if (categorizedTransactions.find((ct) => ct.name === transaction.name)) {
         const updatedCategorizedTransactions = categorizedTransactions.filter(
            (ct) => !(ct.name === transaction.name)
         );

         setCategorizedTransactions(updatedCategorizedTransactions);
      }

      const updatedTransactions = transactions.map((transaction) => {
         if (transaction.id === id) {
            return { ...transaction, category: category };
         }

         return transaction;
      });

      setTransactions(updatedTransactions);
   };

   const handleNewAmountChange = (id: number, newAmount: string) => {
      if (!transactions) return;

      const parsedAmount = parseFloat(newAmount);
      if (isNaN(parsedAmount)) return;

      const updatedTransactions = transactions.map((transaction) => {
         if (transaction.id === id) {
            return { ...transaction, amount: parsedAmount };
         }

         return transaction;
      });

      setTransactions(updatedTransactions);
   };

   const handleNameChange = (id: number, newName: string) => {
      if (!transactions) return;

      const updatedTransactions = transactions.map((transaction) => {
         if (transaction.id === id) {
            return { ...transaction, name: newName };
         }

         return transaction;
      });

      setTransactions(updatedTransactions);
   };

   const handleDescriptionChange = (id: number, newDescription: string) => {
      if (!transactions) return;

      const updatedTransactions = transactions.map((transaction) => {
         if (transaction.id === id) {
            return { ...transaction, description: newDescription };
         }

         return transaction;
      });

      setTransactions(updatedTransactions);
   };

   const handleSortChange = (
      field: "date" | "name" | "amount" | "category"
   ) => {
      if (!transactions) return;

      let newDir: "asc" | "desc" | null = "asc";

      if (sorts[`${field}Dir`] === "asc") {
         newDir = "desc";
      } else if (sorts[`${field}Dir`] === "desc") {
         newDir = null;
      }

      const newSorts = {
         dateDir: null,
         nameDir: null,
         amountDir: null,
         categoryDir: null,
         [`${field}Dir`]: newDir,
      } as {
         dateDir: "asc" | "desc" | null;
         nameDir: "asc" | "desc" | null;
         amountDir: "asc" | "desc" | null;
         categoryDir: "asc" | "desc" | null;
      };

      setSorts(newSorts);

      const sortedTransactions = [...transactions];

      if (newDir === "asc") {
         sortedTransactions.sort((a, b) => {
            if (field === "date") {
               return a.date.getTime() - b.date.getTime();
            } else if (field === "name") {
               return a.name.localeCompare(b.name);
            } else if (field === "amount") {
               return a.amount - b.amount;
            } else if (field === "category") {
               return (a.category ?? "").localeCompare(b.category ?? "");
            }
            return 0;
         });
      } else if (newDir === "desc") {
         sortedTransactions.sort((a, b) => {
            if (field === "date") {
               return b.date.getTime() - a.date.getTime();
            } else if (field === "name") {
               return b.name.localeCompare(a.name);
            } else if (field === "amount") {
               return b.amount - a.amount;
            } else if (field === "category") {
               return (b.category ?? "").localeCompare(a.category ?? "");
            }
            return 0;
         });
      }

      setFilteredTransactions(sortedTransactions);
   };

   return (
      <div className={styles.container}>
         <table className={styles.tableWrapper}>
            <thead>
               <tr>
                  <th
                     className={`${styles.tableHeader} ${styles.tableHeaderOptions}`}
                  ></th>
                  <th
                     className={`${styles.tableHeader} ${styles.tableHeaderDate}`}
                  >
                     <StandardBtn
                        text="Date"
                        style={{ margin: "0 auto" }}
                        RightIcon={
                           sorts.dateDir === "asc"
                              ? CalendarArrowUp
                              : sorts.dateDir === "desc"
                              ? CalendarArrowDown
                              : undefined
                        }
                        onClick={() => handleSortChange("date")}
                     />
                  </th>
                  <th
                     className={`${styles.tableHeader} ${styles.tableHeaderName}`}
                  >
                     <StandardBtn
                        text="Name"
                        style={{ margin: "0 auto" }}
                        RightIcon={
                           sorts.nameDir === "asc"
                              ? ArrowDownAz
                              : sorts.nameDir === "desc"
                              ? ArrowDownZa
                              : undefined
                        }
                        onClick={() => handleSortChange("name")}
                     />
                  </th>
                  <th
                     className={`${styles.tableHeader} ${styles.tableHeaderDescription}`}
                  >
                     Description
                  </th>
                  <th className={styles.tableHeader}>
                     <StandardBtn
                        text="Amount"
                        style={{ margin: "0 auto" }}
                        RightIcon={
                           sorts.amountDir === "asc"
                              ? ArrowUp01
                              : sorts.amountDir === "desc"
                              ? ArrowDown01
                              : undefined
                        }
                        onClick={() => handleSortChange("amount")}
                     />
                  </th>
                  <th
                     className={`${styles.tableHeader} ${styles.tableHeaderCategory}`}
                  >
                     <StandardBtn
                        text="Category"
                        style={{ margin: "0 auto" }}
                        RightIcon={
                           sorts.categoryDir === "asc"
                              ? ArrowUpAZ
                              : sorts.categoryDir === "desc"
                              ? ArrowDownZa
                              : undefined
                        }
                        onClick={() => handleSortChange("category")}
                     />
                  </th>
               </tr>
            </thead>
            <tbody className={styles.tableBody}>
               {filteredTransactions &&
                  filteredTransactions.map((transaction) => (
                     <tr className={styles.tableRow} key={transaction.id}>
                        <td className={styles.tableData}>
                           <StandardBtn LeftIcon={Trash2} />
                        </td>
                        <td className={styles.tableData}>
                           {transaction.date.toLocaleDateString()}
                        </td>
                        <td className={styles.tableData}>
                           <StandardInput
                              style={{
                                 textAlign: "center",
                              }}
                              value={transaction.name}
                              onChange={(value: string) =>
                                 handleNameChange(transaction.id, value)
                              }
                           />
                        </td>
                        <td className={styles.tableData}>
                           <StandardInput
                              style={{
                                 textAlign: "center",
                              }}
                              value={transaction.description}
                              onChange={(value: string) =>
                                 handleDescriptionChange(transaction.id, value)
                              }
                           />
                        </td>
                        <td className={styles.tableData}>
                           <div className={styles.amountWrapper}>
                              <DollarSign
                                 className={
                                    transaction.amount < 0
                                       ? styles.negativeDollarSign
                                       : styles.positiveDollarSign
                                 }
                                 size="18"
                              />
                              <StandardInput
                                 style={{
                                    maxWidth: "100px",
                                    textAlign: "right",
                                 }}
                                 value={transaction.amount
                                    .toLocaleString("en-US", {
                                       minimumFractionDigits: 2,
                                       maximumFractionDigits: 2,
                                    })
                                    .toString()}
                                 onChange={(newAmount: string) =>
                                    handleNewAmountChange(
                                       transaction.id,
                                       newAmount
                                    )
                                 }
                                 styleType={
                                    transaction.amount < 0
                                       ? "danger"
                                       : "success"
                                 }
                              />
                           </div>
                        </td>
                        <td className={styles.tableData}>
                           <StandardDropdown
                              value={transaction.category ?? ""}
                              dropdownName="Categories"
                              options={categories ?? []}
                              onChange={(newCategory: string) =>
                                 handleTransactionCategoryChange({
                                    id: transaction.id,
                                    category: newCategory,
                                 })
                              }
                           />
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
}
