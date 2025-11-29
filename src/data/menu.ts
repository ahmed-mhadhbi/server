// Seed data for initial menu setup
// This can be used to populate Firestore with initial menu items

import { MenuItem, Category } from '@/types';

export const seedCategories: Category[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Start your meal right',
    order: 1,
  },
  {
    id: 'mains',
    name: 'Main Courses',
    description: 'Hearty and delicious',
    order: 2,
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings',
    order: 3,
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Drinks and refreshments',
    order: 4,
  },
];

export const seedMenuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan',
    price: 8.99,
    category: 'appetizers',
    available: true,
  },
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    description: 'Crispy fried mozzarella with marinara sauce',
    price: 7.99,
    category: 'appetizers',
    available: true,
  },
  {
    id: 'chicken-wings',
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings with blue cheese dip',
    price: 12.99,
    category: 'appetizers',
    available: true,
  },
  // Main Courses
  {
    id: 'burger',
    name: 'Classic Burger',
    description: 'Beef patty with lettuce, tomato, onion, and special sauce',
    price: 14.99,
    category: 'mains',
    available: true,
  },
  {
    id: 'pasta',
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan',
    price: 16.99,
    category: 'mains',
    available: true,
  },
  {
    id: 'steak',
    name: 'Ribeye Steak',
    description: 'Grilled ribeye with mashed potatoes and vegetables',
    price: 28.99,
    category: 'mains',
    available: true,
  },
  {
    id: 'salmon',
    name: 'Grilled Salmon',
    description: 'Fresh salmon with lemon butter sauce and rice',
    price: 22.99,
    category: 'mains',
    available: true,
  },
  // Desserts
  {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with vanilla ice cream',
    price: 7.99,
    category: 'desserts',
    available: true,
  },
  {
    id: 'cheesecake',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with berry compote',
    price: 8.99,
    category: 'desserts',
    available: true,
  },
  // Beverages
  {
    id: 'cola',
    name: 'Cola',
    description: 'Refreshing cola drink',
    price: 2.99,
    category: 'beverages',
    available: true,
  },
  {
    id: 'lemonade',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade',
    price: 3.99,
    category: 'beverages',
    available: true,
  },
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Freshly brewed coffee',
    price: 3.49,
    category: 'beverages',
    available: true,
  },
];

