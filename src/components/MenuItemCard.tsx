'use client';

import { MenuItem } from '@/types';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem, items, updateQuantity } = useCartStore();
  const cartItem = items.find((ci) => ci.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(item, 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      updateQuantity(item.id, 0);
    }
  };

  if (!item.available) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden opacity-60 border border-gray-100">
        {item.image && (
          <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-semibold text-lg px-4 py-2 bg-black/40 rounded-lg">Unavailable</span>
            </div>
          </div>
        )}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 leading-tight">{item.name}</h3>
          <p className="text-gray-600 text-base mb-4 leading-relaxed">{item.description}</p>
          <p className="text-2xl font-bold text-gray-400">
            {formatCurrency(item.price)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {item.image && (
        <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 leading-tight">{item.name}</h3>
        <p className="text-gray-600 text-base mb-4 leading-relaxed min-h-[3rem]">{item.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(item.price)}
          </p>
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-orange-50 rounded-full px-2 py-1">
              <button
                onClick={handleRemove}
                className="p-2 rounded-full bg-white text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-10 text-center font-bold text-gray-900 text-lg">{quantity}</span>
              <button
                onClick={handleAdd}
                className="p-2 rounded-full bg-white text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

