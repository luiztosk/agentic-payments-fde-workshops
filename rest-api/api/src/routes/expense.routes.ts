import { randomUUID } from "crypto";
import { Router, type Request, type Response } from "express";
import { expenses } from "../data/expenses";
import { createExpenseSchema, expenseIdParamSchema } from "../schemas/expense.schema";

export const expenseRouter = Router();

// GET /expenses
expenseRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(expenses);
});

// GET /expenses/:id
expenseRouter.get("/:id", (req: Request, res: Response) => {
  const result = expenseIdParamSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: result.error.issues.map((issue) => issue.message),
    });
  }

  const expense = expenses.find((item) => item.id === result.data.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.status(200).json(expense);
});

// POST /expenses
expenseRouter.post("/", (req: Request, res: Response) => {
  const result = createExpenseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: result.error.issues.map((issue) => issue.message),
    });
  }

  const expense = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...result.data,
  };

  expenses.push(expense);
  res.status(201).json(expense);
});
