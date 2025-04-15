// src/app/api/transactions/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

// Type definition for route context
interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(_request: NextRequest, context: Context) {
  await connectDB();
  const { id } = context.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting transaction" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: Context) {
  await connectDB();
  const { id } = context.params;
  const body = await request.json();

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({ message: "Error updating transaction" }, { status: 500 });
  }
}
