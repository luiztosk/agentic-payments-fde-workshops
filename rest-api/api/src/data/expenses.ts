import { randomUUID } from "crypto";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  createdAt: string;
};

export const expenses: Expense[] = [
  {
    id: randomUUID(),
    description: "Lunch",
    amount: 35,
    category: "food",
    createdAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    description: "Uber",
    amount: 32.5,
    category: "transport",
    createdAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    description: "Books",
    amount: 89.9,
    category: "education",
    createdAt: new Date().toISOString(),
  },
];
