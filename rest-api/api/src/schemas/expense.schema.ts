import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
  amount: z.number().positive("Amount must be greater than zero"),
  category: z.string().trim().min(1, "Category is required"),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;

export const expenseIdParamSchema = z.object({
  id: z.uuid("Invalid expense id"),
});
