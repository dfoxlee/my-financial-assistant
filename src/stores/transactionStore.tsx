import { create } from "zustand";
import type {
   CategorizedTransactionType,
   TransactionType,
} from "../types/transactionTypes";

interface TransactionStoreType {
   transactions: TransactionType[] | null;
   categorizedTransactions: CategorizedTransactionType[];

   setTransactions: (transactions: TransactionType[] | null) => void;
   setCategorizedTransactions: (
      categorizedTransactions: CategorizedTransactionType[]
   ) => void;
}

export const useTransactionStore = create<TransactionStoreType>((set) => ({
   // properties
   transactions: null,
   categorizedTransactions: [],

   // actions
   setTransactions: (transactions) => set({ transactions }),

   setCategorizedTransactions: (categorizedTransactions) =>
      set({ categorizedTransactions }),
}));
