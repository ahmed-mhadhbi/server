import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const menuSnapshot = await getDocs(collection(db, 'menus'));
    const menus: any[] = [];
    menuSnapshot.forEach((doc) => {
      menus.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, menus }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image, available, ingredients, allergens } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    const menuData = {
      name,
      description: description || '',
      price: Number(price),
      category,
      image: image || '',
      available: available !== undefined ? available : true,
      ingredients: ingredients || [],
      allergens: allergens || [],
    };

    const docRef = await addDoc(collection(db, 'menus'), menuData);

    return NextResponse.json(
      {
        success: true,
        menuId: docRef.id,
        message: 'Menu item created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const menuRef = doc(db, 'menus', id);
    await updateDoc(menuRef, updateData);

    return NextResponse.json(
      {
        success: true,
        message: 'Menu item updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const menuRef = doc(db, 'menus', id);
    await deleteDoc(menuRef);

    return NextResponse.json(
      {
        success: true,
        message: 'Menu item deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item', details: error.message },
      { status: 500 }
    );
  }
}

