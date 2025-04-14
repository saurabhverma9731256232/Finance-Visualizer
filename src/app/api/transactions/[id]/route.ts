import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
// import type { NextApiRequest } from 'next';
type RouteContext = { params: { id: string } };

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  await connectDB();

  try {
    const { id } = params;
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
