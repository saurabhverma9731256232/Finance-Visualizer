import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectDB();

  try {
    const categoryAgg = await Transaction.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: '$total',
        },
      },
    ]);

    const monthlyAgg = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: { $toDate: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          monthNumber: '$_id',
          total: 1,
        },
      },
      {
        $addFields: {
          month: {
            $arrayElemAt: [
              ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              '$monthNumber'
            ]
          },
        },
      },
      {
        $project: { month: 1, total: 1 }
      },
      { $sort: { monthNumber: 1 } }
    ]);

    return NextResponse.json({
      categorySummary: categoryAgg,
      monthlySummary: monthlyAgg,
    }, { status: 200 });

  } catch (error) {
    console.error("SUMMARY API ERROR:", error);
    return NextResponse.json({ error: 'Failed to get summary' }, { status: 500 });
  }
}

