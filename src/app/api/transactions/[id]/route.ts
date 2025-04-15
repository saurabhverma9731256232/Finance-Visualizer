// src/app/api/transactions/[id]/route.ts

import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Transaction from "@/models/Transaction";
import { Types } from "mongoose";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(params.id);
    if (!deletedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting transaction" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.log("Error ", error);
    return NextResponse.json({ message: "Error updating transaction" }, { status: 500 });
  }
}
