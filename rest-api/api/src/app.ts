import express from "express";
import { cors } from "./middleware/cors";
import { errorHandler, notFound } from "./middleware/error-handler";
import { requestLogger } from "./middleware/request-logger";
import { expenseRouter } from "./routes/expense.routes";

export const app = express();

app.use(requestLogger);
app.use(cors);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/expenses", expenseRouter);

app.use(notFound);
app.use(errorHandler);
