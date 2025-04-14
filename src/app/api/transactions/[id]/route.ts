import { connectDB } from "@/lib/db";
import  {Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function DELETE(_: any, { params }: any) {
  await connectDB();
  await Transaction.findByIdAndDelete(params._id);
  return NextResponse.json({ success: true });
}
