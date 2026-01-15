import { FileDown } from "lucide-react";
import StandardBtn from "../../shared/StandardBtn";

import styles from "./TemplateDownloader.module.css";

export default function TemplateDownloader() {
   // handlers
   const handleTemplateDownload = () => {
      const templateUrl = "transactions-template.csv";

      const link = document.createElement("a");
      link.href = templateUrl;
      link.download = "transactions-template.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <StandardBtn
         LeftIcon={FileDown}
         text="CSV Transaction Template"
         onClick={handleTemplateDownload}
         outlined={true}
      />
   );
}
