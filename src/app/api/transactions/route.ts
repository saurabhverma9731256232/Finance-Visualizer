import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';

// GET: Fetch all transactions
export async function GET() {
  await connectDB();

  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST: Create a new transaction
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { amount, description, date, category } = body;

    if (!amount || !date || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newTransaction = new Transaction({
      amount,
      description,
      date,
      category
    });

    await newTransaction.save();

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
  }
}
