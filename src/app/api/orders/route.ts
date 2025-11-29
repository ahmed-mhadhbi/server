import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateOrderId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableNumber, items, total, specialInstructions } = body;

    if (!tableNumber || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderData = {
      tableNumber: String(tableNumber),
      items,
      total: Number(total),
      status: 'pending',
      specialInstructions: specialInstructions || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'orders'), orderData);

    return NextResponse.json(
      {
        success: true,
        orderId: docRef.id,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableNumber = searchParams.get('table');

    // This is a simple GET - in production, you'd fetch from Firestore
    // For now, we'll return a message that orders should be fetched client-side
    return NextResponse.json({
      message: 'Use Firestore onSnapshot for real-time updates',
      tableNumber: tableNumber || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}

