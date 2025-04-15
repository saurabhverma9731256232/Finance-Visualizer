"use client"
import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const categories = ['Groceries', 'Transport', 'Food', 'Entertainment', 'Bills', 'Other'];
const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]); // Default value as an empty array
  const [form, setForm] = useState({ amount: '', description: '', date: '', category: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categorySummary, setCategorySummary] = useState<any[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      // Ensure the data is an array before setting the state
      setTransactions(Array.isArray(data) ? data : []);
    };

    const fetchSummary = async () => {
      const res = await fetch('/api/transactions/summary');
      const data = await res.json();
      setCategorySummary(data.categorySummary || []);
      setMonthlySummary(data.monthlySummary || []);
    };

    fetchTransactions();
    fetchSummary();
  }, []);

  const handleSubmit = async () => {
    if (!form.amount || !form.date || !form.category) {
      alert("Amount, date, and category are required.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (editId) {
        res = await fetch(`/api/transactions/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, amount: parseFloat(form.amount) })
        });
      } else {
        res = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, amount: parseFloat(form.amount) })
        });
      }

      await res.json();
      setEditId(null);
      setForm({ amount: '', description: '', date: '', category: '' });

      const txRes = await fetch('/api/transactions');
      const txData = await txRes.json();
      setTransactions(Array.isArray(txData) ? txData : []);

      const sumRes = await fetch('/api/transactions/summary');
      const sumData = await sumRes.json();
      setCategorySummary(sumData.categorySummary || []);
      setMonthlySummary(sumData.monthlySummary || []);
    } catch (err) {
      alert('Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (t: any) => {
    setForm({
      amount: t.amount.toString(),
      description: t.description,
      date: new Date(t.date).toISOString().split('T')[0],
      category: t.category,
    });
    setEditId(t._id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    const updated = transactions.filter((t) => t._id !== id);
    setTransactions(updated);

    const res = await fetch('/api/transactions/summary');
    const data = await res.json();
    setCategorySummary(data.categorySummary || []);
    setMonthlySummary(data.monthlySummary || []);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>

      <input className="w-full mb-2 p-2 border" type="number" placeholder="Amount"
        value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <input className="w-full mb-2 p-2 border" type="text" placeholder="Description"
        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="w-full mb-2 p-2 border" type="date"
        value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <select className="w-full mb-2 p-2 border"
        value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded mb-4"
        disabled={loading}>
        {loading ? 'Saving...' : editId ? 'Update Transaction' : 'Add Transaction'}
      </button>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-2 border rounded">
          Total: ₹{Array.isArray(transactions) ? transactions.reduce((acc, t) => acc + t.amount, 0) : 0}
        </div>
        <div className="p-2 border rounded">Transactions: {transactions.length}</div>
      </div>

      <h2 className="font-semibold mb-2">Transactions</h2>
      {transactions.map((t) => (
        <div key={t._id} className="flex justify-between items-center border p-2 mb-1 rounded">
          <div>
            {new Date(t.date).toISOString().split('T')[0]} - {t.category} - {t.description} - ₹{t.amount}
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleEdit(t)} className="text-blue-600">Edit</button>
            <button onClick={() => handleDelete(t._id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}

      {/* Pie Chart */}
      <h2 className="font-semibold mt-6 mb-2">Category-wise Spending</h2>
      {categorySummary.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categorySummary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {categorySummary.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">No category data available.</p>
      )}

      {/* Bar Chart */}
      <h2 className="font-semibold mt-6 mb-2">Monthly Spending</h2>
      {monthlySummary.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySummary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">No monthly data available.</p>
      )}
    </main>
  );
}
