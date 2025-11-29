'use client';

import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, where, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Order, WaiterCall, OrderStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ChefHat, Bell, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function StaffDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiterCalls, setWaiterCalls] = useState<WaiterCall[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'calls'>('orders');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listen to orders
    const ordersQuery = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersList: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ordersList.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate() || new Date(data.updatedAt),
        } as Order);
      });
      setOrders(ordersList);
    });

    // Listen to waiter calls
    const callsQuery = query(
      collection(db, 'waiterCalls'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeCalls = onSnapshot(callsQuery, (snapshot) => {
      const callsList: WaiterCall[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        callsList.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(data.createdAt),
        } as WaiterCall);
      });
      setWaiterCalls(callsList);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeCalls();
    };
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert('Logout failed: ' + error.message);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const resolveWaiterCall = async (callId: string) => {
    try {
      const callRef = doc(db, 'waiterCalls', callId);
      await updateDoc(callRef, {
        status: 'resolved',
        resolvedAt: new Date(),
        resolvedBy: user?.uid,
      });
    } catch (error) {
      console.error('Error resolving call:', error);
      alert('Failed to resolve call');
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'preparing':
        return <ChefHat className="w-4 h-4" />;
      case 'ready':
        return <CheckCircle className="w-4 h-4" />;
      case 'served':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Login</h1>
            <p className="text-gray-600">Access your dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-base"
                placeholder="staff@resteau.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-base"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Staff Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage orders and waiter calls</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-600 mb-2">Pending Orders</p>
            <p className="text-4xl font-bold text-yellow-600">{pendingOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-600 mb-2">Preparing</p>
            <p className="text-4xl font-bold text-blue-600">{preparingOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-600 mb-2">Ready</p>
            <p className="text-4xl font-bold text-green-600">{readyOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-600 mb-2">Waiter Calls</p>
            <p className="text-4xl font-bold text-red-600">{waiterCalls.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-3 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-bold text-base transition-all relative ${
                activeTab === 'orders'
                  ? 'text-orange-600 border-b-4 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`px-6 py-3 font-bold text-base transition-all relative ${
                activeTab === 'calls'
                  ? 'text-orange-600 border-b-4 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Waiter Calls
              {waiterCalls.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {waiterCalls.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <ChefHat className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-700 text-lg font-semibold mb-2">No orders yet</p>
                <p className="text-gray-500 text-sm">Orders will appear here when customers place them</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium">Table #{order.tableNumber}</span>
                        <span>•</span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-6 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-bold text-gray-900 text-base">{item.item.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatCurrency(item.item.price)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-lg text-gray-900">
                          {formatCurrency(item.item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">
                      Total: <span className="text-orange-600">{formatCurrency(order.total)}</span>
                    </p>
                    <div className="flex gap-3">
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Start Preparing
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'served')}
                          className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Mark Served
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Waiter Calls Tab */}
        {activeTab === 'calls' && (
          <div className="space-y-4">
            {waiterCalls.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <Bell className="w-10 h-10 text-green-500" />
                </div>
                <p className="text-gray-700 text-lg font-semibold mb-2">No active waiter calls</p>
                <p className="text-gray-500 text-sm">All calls have been resolved</p>
              </div>
            ) : (
              waiterCalls.map((call) => (
                <div key={call.id} className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border-l-4 border-red-500 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                        <Bell className="w-7 h-7 text-red-500 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Table #{call.tableNumber}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          Called {formatDate(call.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => resolveWaiterCall(call.id)}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

