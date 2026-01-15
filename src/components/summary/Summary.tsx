import ByCategoryTable from "./components/ByCategoryTable";
import ByDateTable from "./components/ByDateTable";
import ByNameTable from "./components/ByNameTable";

import styles from "./Summary.module.css";

export default function Summary() {
   return (
      <div>
         <ByCategoryTable />
         <ByDateTable />
         <ByNameTable />
      </div>
   );
}
