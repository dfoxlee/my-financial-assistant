export interface TransactionType {
   id: number;
   date: Date;
   name: string;
   description: string;
   amount: number;
   category?: string | undefined;
}

export interface CategorizedTransactionType {
   name: string;
   category: string;
}
