import { useEffect, useState, type FormEvent } from "react";
import type { Expense } from "./types";

const API_URL = "http://localhost:3000";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/expenses`)
      .then((res) => res.json())
      .then(setExpenses)
      .catch(() => setError("Could not load expenses."));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: Number(amount),
          category,
        }),
      });

      if (res.status === 400) {
        setError("Please check the entered values.");
        return;
      }

      if (!res.ok) {
        setError("Could not create expense.");
        return;
      }

      const newExpense: Expense = await res.json();
      setExpenses((current) => [...current, newExpense]);
      setDescription("");
      setAmount("");
      setCategory("");
    } catch {
      setError("Could not create expense.");
    }
  }

  return (
    <main className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          step="0.01"
          min="0"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        />
        <button type="submit">Add expense</button>
      </form>

      {error && <p className="error">{error}</p>}

      <section>
        <h2>Expenses</h2>
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <strong>{expense.description}</strong>
                <span className="category">{expense.category}</span>
              </div>
              <span className="amount">R$ {expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
