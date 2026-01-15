// src/utils/csvParser.ts
import { parse, isValid } from "date-fns";
import { z } from "zod";
import { type TransactionType } from "../types/transactionTypes";
import { toast } from "react-toastify";

// Zod schema for validation
const TransactionSchema = z.object({
   date: z.string().min(1, "Date is required"),
   name: z.string().min(1, "Name is required"),
   description: z.string(),
   amount: z.string().min(1, "Amount is required"),
   accountName: z.string().optional(),
});

// Common date formats to try
const DATE_FORMATS = [
   "yyyy-MM-dd",
   "MM/dd/yyyy",
   "M/d/yyyy",
   "dd/MM/yyyy",
   "d/M/yyyy",
   "yyyy/MM/dd",
   "MMM dd, yyyy",
   "MMMM dd, yyyy",
   "dd-MM-yyyy",
   "MM-dd-yyyy",
];

/**
 * Parse a date string trying multiple formats
 */
function parseDate(dateStr: string): Date | null {
   // Try each format
   for (const format of DATE_FORMATS) {
      const parsed = parse(dateStr, format, new Date());
      if (isValid(parsed)) {
         return parsed;
      }
   }

   // Fallback to native Date parsing
   const nativeParsed = new Date(dateStr);
   if (isValid(nativeParsed)) {
      return nativeParsed;
   }

   return null;
}

/**
 * Parse amount string and handle various formats
 * Examples: "$1,234.56", "-45.50", "(100.00)", "1. 234,56"
 */
function parseAmount(amountStr: string): number {
   let cleaned = amountStr.trim();

   // Handle parentheses as negative (accounting format)
   const isNegative = cleaned.startsWith("(") && cleaned.endsWith(")");
   if (isNegative) {
      cleaned = cleaned.slice(1, -1);
   }

   // Remove currency symbols ($, €, £, ¥, etc.)
   cleaned = cleaned.replace(/[$€£¥₹]/g, "");

   // Remove spaces
   cleaned = cleaned.replace(/\s/g, "");

   // Detect European format (1.234,56) vs US format (1,234.56)
   const hasCommaDecimal = /,\d{1,2}$/.test(cleaned);

   if (hasCommaDecimal) {
      // European format: replace dots with nothing, comma with dot
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
   } else {
      // US format: just remove commas
      cleaned = cleaned.replace(/,/g, "");
   }

   const amount = parseFloat(cleaned);

   if (isNaN(amount)) {
      throw new Error(`Invalid amount: ${amountStr}`);
   }

   return isNegative ? -Math.abs(amount) : amount;
}

/**
 * Parse a single CSV row into a Transaction object
 */
export function parseTransaction(
   index: number,
   row: any
): TransactionType | null {
   try {
      // Validate required fields
      const validated = TransactionSchema.parse(row);

      // Parse date
      const date = parseDate(validated.date);

      if (!date) {
         console.error(`Invalid date format: ${validated.date}`);
         return null;
      }

      // Parse amount
      let amount: number;

      try {
         amount = parseAmount(validated.amount);
      } catch (error) {
         console.error(`Invalid amount: ${validated.amount}`, error);
         return null;
      }

      // Build transaction object
      const transaction: TransactionType = {
         id: index,
         date,
         name: validated.name.trim(),
         description: validated.description.trim() || "",
         amount,
         category: undefined,
      };

      return transaction;
   } catch (error) {
      if (error instanceof z.ZodError) {
         console.error("Validation error:", error);

         toast.error(z.prettifyError(error));
      } else {
         console.error(error);

         toast.error(
            "An unexpected error occurred while parsing a transaction."
         );
      }

      return null;
   }
}

/**
 * Parse multiple transactions with error reporting
 */
export function parseTransactions(rows: any[]): {
   transactions: TransactionType[];
   errors: Array<{ row: number; error: string }>;
} {
   const transactions: TransactionType[] = [];
   const errors: Array<{ row: number; error: string }> = [];

   rows.forEach((row, index) => {
      try {
         const transaction = parseTransaction(index, row);

         if (transaction) {
            transactions.push(transaction);
         } else {
            errors.push({
               row: index + 2, // +2 because:  +1 for header, +1 for 0-index
               error: "Failed to parse transaction",
            });
         }
      } catch (error) {
         errors.push({
            row: index + 2,
            error: error instanceof Error ? error.message : "Unknown error",
         });
      }
   });

   return { transactions, errors };
}

/**
 * Detect duplicate transactions
 */
export function detectDuplicates(
   newTransactions: TransactionType[],
   existingTransactions: TransactionType[]
): TransactionType[] {
   const existingSet = new Set(
      existingTransactions.map(
         (t) => `${t.date.getTime()}-${t.description}-${t.amount}`
      )
   );

   return newTransactions.filter((t) => {
      const key = `${t.date.getTime()}-${t.description}-${t.amount}`;
      return !existingSet.has(key);
   });
}
