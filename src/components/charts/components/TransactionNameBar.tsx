import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSummary } from "../../../hooks/useSummary";
import { useMemo, useState } from "react";
import StandardBtn from "../../shared/StandardBtn";

import styles from "./TransactionNameBar.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const noTransactionOptions = ["10", "25", "30"];

export default function TransactionNameBar() {
   // hooks
   const { byName } = useSummary();

   // states
   const [selectedNoTransactionNames, setSelectedNoTransactionNames] =
      useState("10");

   // memoized values
   const byNameSorted = useMemo(() => {
      return [...byName]
         .sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
         .slice(0, Number(selectedNoTransactionNames));
   }, [byName, selectedNoTransactionNames]);

   // chart data
   const options = {
      responsive: true,
      plugins: {
         legend: {
            display: false,
            position: "top" as const,
         },
         title: {
            display: false,
            text: "Transaction Amounts by Name",
         },
      },
   };

   const data = {
      labels: byNameSorted.map((item) => item.key),
      datasets: [
         {
            label: "Amount",
            data: byNameSorted.map((item) => item.total),
            backgroundColor: "#15803d",
         },
      ],
   };

   // handlers
   const handleNoTransactionChange = (value: string) => {
      setSelectedNoTransactionNames(value);
   };

   return (
      <div className={styles.container}>
         <h3 className={styles.title}>Transaction Amounts by Name</h3>
         <div className={styles.noTransactionBtnsWrapper}>
            {noTransactionOptions.map((option) => (
               <StandardBtn
                  key={option}
                  text={option}
                  outlined={selectedNoTransactionNames !== option}
                  filled={selectedNoTransactionNames === option}
                  styleType="standard"
                  onClick={() => handleNoTransactionChange(option)}
               />
            ))}
         </div>
         <Bar options={options} data={data} />
      </div>
   );
}
