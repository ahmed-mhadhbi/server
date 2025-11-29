'use client';

import { useEffect, useState, Suspense } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem, Category } from '@/types';
import MenuItemCard from '@/components/MenuItemCard';
import Cart from '@/components/Cart';
import CallWaiterButton from '@/components/CallWaiterButton';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

function MenuContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table') || '1';
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Fetch categories
    const categoriesQuery = query(
      collection(db, 'categories'),
      orderBy('order', 'asc')
    );

    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const cats: Category[] = [];
      snapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(cats);
    });

    // Fetch menu items
    const menuQuery = query(collection(db, 'menus'), orderBy('name', 'asc'));

    const unsubscribeMenu = onSnapshot(menuQuery, (snapshot) => {
      const items: MenuItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setMenuItems(items);
      setLoading(false);
    });

    return () => {
      unsubscribeCategories();
      unsubscribeMenu();
    };
  }, []);

  const handleCheckout = async (specialInstructions?: string) => {
    const { items, getTotal } = useCartStore.getState();
    const total = getTotal();

    if (items.length === 0) return;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableNumber,
          items,
          total,
          specialInstructions: specialInstructions || '',
        }),
      });

      if (response.ok) {
        clearCart();
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Loading menu...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Our Menu</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
              <span className="text-sm font-medium text-gray-600">Table</span>
              <span className="text-lg font-bold text-orange-600">#{tableNumber}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 font-medium text-base ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 font-medium text-base ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <p className="text-gray-600 text-lg font-medium">No items available in this category.</p>
            <p className="text-gray-500 text-sm mt-2">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Cart tableNumber={tableNumber} onCheckout={handleCheckout} />
      <CallWaiterButton tableNumber={tableNumber} />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading menu...</p>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}

