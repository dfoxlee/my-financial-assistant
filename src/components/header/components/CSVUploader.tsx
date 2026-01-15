import { useDropzone } from "react-dropzone";
import { parseTransactions } from "../../../utils/csvParser";
import { toast } from "react-toastify";
import { parse } from "papaparse";
import { useTransactionStore } from "../../../stores/transactionStore";
import StandardBtn from "../../shared/StandardBtn";

import styles from "./CSVUploader.module.css";

export default function CSVUploader() {
   // stores
   const setTransactions = useTransactionStore(
      (store) => store.setTransactions
   );

   // hook handlers
   const handleDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      parse(file, {
         header: true,
         skipEmptyLines: true,
         complete: (results) => {
            const { data, errors } = results;

            if (errors.length > 0) {
               if (errors.length < 5) {
                  errors.forEach((error) => {
                     console.error(error);

                     toast.error(`CSV parsing error: ${error.message}`);
                  });
               } else {
                  console.error(
                     `${errors.length} errors found during CSV parsing.`
                  );

                  toast.error(
                     `${errors.length} errors found during CSV parsing. Please check the console for details.`
                  );
               }
               return;
            }

            const { transactions, errors: parseErrors } = parseTransactions(
               data as any[]
            );

            if (parseErrors.length > 0) {
               if (parseErrors.length < 5) {
                  parseErrors.forEach((parseError) => {
                     console.error(
                        `Row ${parseError.row}: ${parseError.error}`
                     );

                     toast.error(`Row ${parseError.row}: ${parseError.error}`);
                  });
               } else {
                  console.error(
                     `${parseErrors.length} errors found during parsing.`
                  );

                  toast.error(
                     `${parseErrors.length} errors found during parsing. Please check the console for details.`
                  );
               }
            }

            if (transactions.length > 0) {
               toast.success(
                  `Successfully parsed ${transactions.length} transactions.`
               );

               setTransactions(
                  transactions.sort(
                     (a, b) => b.date.getTime() - a.date.getTime()
                  )
               );
            }
         },
         error: (error) => {
            console.error(error);

            toast.error("Error reading CSV file.");
         },
      });
   };

   const handleDropRejected = (fileRejections: any) => {
      fileRejections.forEach((rejection: any) => {
         rejection.errors.forEach((error: any) => {
            console.error(error);

            toast.error(`File upload error: ${error.message}`);
         });
      });
   };

   // hooks
   const { getRootProps, getInputProps } = useDropzone({
      accept: { ".csv": [".csv"] },
      multiple: false,
      onDrop: handleDrop,
      onDropRejected: handleDropRejected,
   });

   return (
      <div {...getRootProps()} className={styles.container}>
         <input {...getInputProps()} />
         <p className={styles.text}>
            Drag & Drop Drop Your Completed CSV Templates
         </p>
         <p className={styles.textSeparator}>or</p>
         <p className={styles.text}>Click To Select File</p>
      </div>
   );
}
