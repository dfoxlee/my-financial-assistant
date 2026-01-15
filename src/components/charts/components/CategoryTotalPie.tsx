import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
import { useSummary } from "../../../hooks/useSummary";
import styles from "./CategoryTotalPie.module.css";

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

export default function CategoryTotalPie() {
   // hooks
   const { byCategory } = useSummary();

   const data = useMemo(() => {
      const colors = byCategory.map(() => generateRandomColor());

      return {
         labels: byCategory.map((item) => item.key),
         datasets: [
            {
               label: "Total",
               data: byCategory.map((item) => Math.abs(item.total)),
               backgroundColor: colors.map((c) => c.bg),
               borderColor: colors.map((c) => c.border),
               borderWidth: 1,
            },
         ],
      };
   }, [byCategory]);

   return (
      <div className={styles.container}>
         <h3 className={styles.title}>Category Totals</h3>
         <Pie data={data} options={options} />
      </div>
   );
}
