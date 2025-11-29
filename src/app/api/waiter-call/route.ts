import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableNumber } = body;

    if (!tableNumber) {
      return NextResponse.json(
        { error: 'Table number is required' },
        { status: 400 }
      );
    }

    const callData = {
      tableNumber: String(tableNumber),
      status: 'active',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'waiterCalls'), callData);

    return NextResponse.json(
      {
        success: true,
        callId: docRef.id,
        message: 'Waiter called successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating waiter call:', error);
    return NextResponse.json(
      { error: 'Failed to call waiter', details: error.message },
      { status: 500 }
    );
  }
}

