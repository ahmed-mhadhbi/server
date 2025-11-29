'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

interface CallWaiterButtonProps {
  tableNumber: string;
  onCall?: () => void;
}

export default function CallWaiterButton({ tableNumber, onCall }: CallWaiterButtonProps) {
  const [isCalling, setIsCalling] = useState(false);
  const [called, setCalled] = useState(false);

  const handleCall = async () => {
    if (isCalling || called) return;

    setIsCalling(true);
    try {
      const response = await fetch('/api/waiter-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableNumber }),
      });

      if (response.ok) {
        setCalled(true);
        if (onCall) {
          onCall();
        }
        // Reset after 5 seconds
        setTimeout(() => {
          setCalled(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error calling waiter:', error);
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <button
      onClick={handleCall}
      disabled={isCalling || called}
      className={`fixed bottom-24 right-6 z-50 p-5 rounded-full shadow-2xl transition-all duration-300 ${
        called
          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-110'
          : isCalling
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-110'
      }`}
      aria-label="Call waiter"
    >
      <Bell className={`w-6 h-6 ${called ? 'animate-pulse' : ''}`} />
      {called && (
        <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs font-bold rounded-full px-3 py-1.5 shadow-lg animate-bounce">
          Called!
        </span>
      )}
    </button>
  );
}

