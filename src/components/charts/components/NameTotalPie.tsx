import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo, useState } from "react";
import { useSummary } from "../../../hooks/useSummary";
import styles from "./NameTotalPie.module.css";
import StandardBtn from "../../shared/StandardBtn";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColor = () => {
   const r = Math.floor(Math.random() * 255);
   const g = Math.floor(Math.random() * 255);
   const b = Math.floor(Math.random() * 255);
   return {
      bg: `rgba(${r}, ${g}, ${b}, 0.2)`,
      border: `rgba(${r}, ${g}, ${b}, 1)`,
   };
};

const options = {
   responsive: true,
   plugins: {
      legend: {
         position: "right" as const,
      },
      title: {
         display: false,
      },
   },
};

const noTransactionOptions = ["5", "10", "15"];

export default function NameTotalPie() {
   // hooks
   const { byName } = useSummary();

   // states
   const [selectedNoTransactionNames, setSelectedNoTransactionNames] =
      useState("10");

   // memoized values
   const data = useMemo(() => {
      const colors = byName.map(() => generateRandomColor());

      return {
         labels: byName
            .sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
            .map((item) => item.key)
            .slice(0, Number(selectedNoTransactionNames)),
         datasets: [
            {
               label: "Total",
               data: byName
                  .map((item) => Math.abs(item.total))
                  .sort((a, b) => Math.abs(b) - Math.abs(a))
                  .slice(0, Number(selectedNoTransactionNames)),
               backgroundColor: colors.map((c) => c.bg),
               borderColor: colors.map((c) => c.border),
               borderWidth: 1,
            },
         ],
      };
   }, [byName, selectedNoTransactionNames]);

   // handlers
   const handleNoTransactionChange = (value: string) => {
      setSelectedNoTransactionNames(value);
   };

   return (
      <div className={styles.container}>
         <h3 className={styles.title}>Name Totals</h3>
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
         <Pie data={data} options={options} />
      </div>
   );
}
