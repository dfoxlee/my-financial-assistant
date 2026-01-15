import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSummary } from "../../../hooks/useSummary";
import styles from "./TotalSpentPerDayLine.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

export default function TotalSpentPerDayLine() {
   // hooks
   const { byDate } = useSummary();

   const options = {
      responsive: true,
      plugins: {
         legend: {
            display: false,
         },
         title: {
            display: false,
         },
      },
   };

   const data = {
      labels: byDate.map((item) => item.key),
      datasets: [
         {
            label: "Amount",
            data: byDate.map((item) => item.total),
            borderColor: "#15803d",
            backgroundColor: "#15803d",
         },
      ],
   };

   return (
      <div className={styles.container}>
         <h3 className={styles.title}>Total Spent Per Day</h3>
         <Line options={options} data={data} />
      </div>
   );
}
