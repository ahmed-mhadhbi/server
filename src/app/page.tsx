import Link from 'next/link';
import { ChefHat, QrCode, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-20">
          <h1 className="text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            Resteau
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-700 font-medium mb-4">
            Digital Restaurant System
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modern QR menu ordering system with real-time order tracking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Link
            href="/menu"
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:scale-105"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6 group-hover:scale-110 transition-transform">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Menu</h2>
            <p className="text-gray-600 text-center text-base leading-relaxed">
              Browse our menu and place your order
            </p>
          </Link>

          <Link
            href="/staff"
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:scale-105"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Staff</h2>
            <p className="text-gray-600 text-center text-base leading-relaxed">
              Staff dashboard for managing orders
            </p>
          </Link>

          <Link
            href="/qr-generator"
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:scale-105"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">QR Generator</h2>
            <p className="text-gray-600 text-center text-base leading-relaxed">
              Generate QR codes for tables
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

