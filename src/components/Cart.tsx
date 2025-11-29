'use client';

import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { formatCurrency, calculateTotal } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface CartProps {
  tableNumber?: string;
  onCheckout?: (specialInstructions?: string) => void;
}

export default function Cart({ tableNumber, onCheckout }: CartProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const total = getTotal();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-full shadow-2xl hover:shadow-orange-300/50 hover:scale-110 transition-all duration-300"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-full shadow-2xl hover:shadow-orange-300/50 hover:scale-110 transition-all duration-300 relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-pulse">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {tableNumber && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-gray-600 mb-1">Table Number</p>
                  <p className="text-2xl font-bold text-blue-600">#{tableNumber}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {items.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    {cartItem.item.image && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{cartItem.item.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {formatCurrency(cartItem.item.price)} × {cartItem.quantity}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="w-8 text-center font-bold text-gray-900">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(cartItem.item.id)}
                          className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Special Instructions <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  rows={3}
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              <div className="border-t-2 border-gray-100 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-700">Total</span>
                  <span className="text-3xl font-bold text-orange-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (onCheckout) {
                      onCheckout(specialInstructions);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Place Order
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setSpecialInstructions('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
