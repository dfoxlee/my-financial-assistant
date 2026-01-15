import { useState } from "react";
import StandardBtn from "./shared/StandardBtn";
// import Summary from "./summary/Summary";
import Charts from "./charts/Charts";
import Transactions from "./transactions/Transactions";

import styles from "./ViewSelector.module.css";

export default function ViewSelector({
   openAssignCategoriesModal,
}: // openEditCategoriesModal,
{
   openAssignCategoriesModal: () => void;
   // openEditCategoriesModal: () => void;
}) {
   // states
   const [currentView, setCurrentView] = useState("Transactions");

   // handlers
   const handleViewChange = (view: string) => {
      if (view === currentView) return;

      setCurrentView(view);
   };

   return (
      <div className={styles.container}>
         <div className={styles.selectorBtnsWrapper}>
            <StandardBtn
               text="Transactions"
               filled={currentView === "Transactions"}
               outlined={currentView !== "Transactions"}
               onClick={() => handleViewChange("Transactions")}
            />
            {/* <StandardBtn
               text="Summary"
               filled={currentView === "Summary"}
               outlined={currentView !== "Summary"}
               onClick={() => handleViewChange("Summary")}
            /> */}
            <StandardBtn
               text="Charts"
               filled={currentView === "Charts"}
               outlined={currentView !== "Charts"}
               onClick={() => handleViewChange("Charts")}
            />
         </div>
         {currentView === "Transactions" ? (
            <Transactions
               openAssignCategoriesModal={openAssignCategoriesModal}
               // openEditCategoriesModal={openEditCategoriesModal}
            />
         ) : // ) : currentView === "Summary" ? (
         //    <Summary />
         currentView === "Charts" ? (
            <Charts />
         ) : null}
      </div>
   );
}
