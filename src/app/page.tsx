"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  _id?: string;
  amount: number;
  description: string;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<Transaction>({
    amount: 0,
    description: "",
    date: "",
  });

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(setTransactions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "amount" ? Number(value) : value });
  };

  const addTransaction = async () => {
    if (!form.amount || !form.description || !form.date) return alert("Please fill all fields");

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const newTx = await res.json();
    setTransactions(prev => [newTx, ...prev]);
    setForm({ amount: 0, description: "", date: "" });
  };

  const deleteTransaction = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions(prev => prev.filter(tx => tx._id !== id));
  };

  // Group by month for chart
  const monthlyTotals = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>

      <input
        type="number"
        name="amount"
        value={form.amount || ""}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded p-2 mb-2"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-2"
      />

      <button
        onClick={addTransaction}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Add Transaction
      </button>

      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      {transactions.map(tx => (
        <div
          key={tx._id}
          className="flex justify-between items-center border p-2 rounded mb-1"
        >
          <span>
            {tx.date.slice(0, 10)} - {tx.description}
          </span>
          <div className="flex gap-2 items-center">
            <span>₹{tx.amount}</span>
            <button onClick={() => deleteTransaction(tx._id)} className="text-red-600">
              ❌
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-lg font-semibold mt-6 mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="rgba(99,102,241,0.6)" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
