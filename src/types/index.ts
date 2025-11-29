export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  ingredients?: string[];
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  total: number;
  specialInstructions?: string;
  waiterId?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';

export interface WaiterCall {
  id: string;
  tableNumber: string;
  createdAt: Date | string;
  status: 'active' | 'resolved';
  resolvedAt?: Date | string;
  resolvedBy?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  active: boolean;
  createdAt: Date | string;
}

export type StaffRole = 'admin' | 'waiter' | 'cook';

export interface TableSession {
  id: string;
  tableNumber: string;
  qrCode: string;
  active: boolean;
  createdAt: Date | string;
  lastOrderAt?: Date | string;
}

