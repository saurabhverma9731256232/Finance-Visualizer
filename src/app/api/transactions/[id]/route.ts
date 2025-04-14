import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';

// Define the context type properly
type RouteContext = { params: { id: string } };

export async function DELETE(req: NextRequest, context: RouteContext) {
  await connectDB();

  try {
    const { id } = context.params;  // Now properly destructured
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    // Check if the transaction was deleted
    if (!deletedTransaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
