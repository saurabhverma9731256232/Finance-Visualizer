'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !date) return alert("Please fill all fields");
    // Here we'll later POST to backend or update local state
    console.log({ amount, description, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <Input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <Input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}