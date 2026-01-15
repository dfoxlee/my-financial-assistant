import { useMemo } from "react";
import { useTransactionStore } from "../stores/transactionStore";
import type { TransactionType } from "../types/transactionTypes";

type SummaryBucket = {
   key: string;
   total: number;
};

const toDateKey = (date: Date) => date.toLocaleDateString();

const groupBy = (
   transactions: TransactionType[],
   keyFn: (tx: TransactionType) => string
): SummaryBucket[] => {
   const totals = new Map<string, number>();

   transactions.forEach((tx) => {
      const key = keyFn(tx);
      totals.set(key, (totals.get(key) ?? 0) + tx.amount);
   });

   return Array.from(totals.entries()).map(([key, total]) => ({ key, total }));
};

export const useSummary = () => {
   const transactions = useTransactionStore((store) => store.transactions);

   return useMemo(() => {
      const txs = transactions ?? [];

      const uniqueNames = Array.from(
         new Set(txs.map((tx) => tx.name || "(no name)"))
      ).sort();

      const byDate = groupBy(txs, (tx) => toDateKey(tx.date));
      const byCategory = groupBy(
         txs,
         (tx) => tx.category ?? "Uncategorized"
      ).sort((a, b) => a.total - b.total);
      const byName = groupBy(txs, (tx) => tx.name || "(no name)").sort(
         (a, b) => a.total - b.total
      );

      return {
         uniqueNames,
         byDate,
         byCategory,
         byName,
      };
   }, [transactions]);
};
