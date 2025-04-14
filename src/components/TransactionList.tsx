
'use client';
import { useState } from "react";

export function TransactionList() {
  const [transactions] = useState([
    { id: 1, amount: 100, description: "Groceries", date: "2025-04-10" },
    { id: 2, amount: 50, description: "Transport", date: "2025-04-11" },
  ]);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((txn) => (
          <li key={txn.id} className="border rounded p-2 flex justify-between">
            <span>{txn.date} - {txn.description}</span>
            <span className="font-medium">₹{txn.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
