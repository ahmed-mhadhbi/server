# Project Structure

```
resteau-next/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/                # Backend API Routes
│   │   │   ├── categories/     # Category CRUD operations
│   │   │   ├── menu/           # Menu item CRUD operations
│   │   │   ├── orders/         # Order creation and management
│   │   │   └── waiter-call/    # Waiter call endpoints
│   │   ├── menu/               # Customer menu page
│   │   ├── staff/              # Staff dashboard
│   │   ├── qr-generator/       # QR code generator
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/             # React components
│   │   ├── MenuItemCard.tsx    # Menu item display card
│   │   ├── Cart.tsx            # Shopping cart component
│   │   └── CallWaiterButton.tsx # Call waiter button
│   │
│   ├── lib/                    # Utilities and configurations
│   │   ├── firebase.ts         # Firebase client initialization
│   │   ├── admin.ts            # Firebase Admin SDK (server-side)
│   │   └── utils.ts            # Helper functions
│   │
│   ├── store/                  # State management
│   │   └── cartStore.ts        # Zustand cart store
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # All type definitions
│   │
│   ├── data/                   # Seed data
│   │   └── menu.ts             # Sample menu items and categories
│   │
│   └── scripts/                # Utility scripts
│       └── seed-data.ts        # Database seeding script
│
├── public/                     # Static assets (if any)
├── .env.local                  # Environment variables (not in git)
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── firebase.json               # Firebase configuration
├── firestore.rules             # Firestore security rules
├── storage.rules                # Firebase Storage rules
├── vercel.json                 # Vercel deployment config
├── README.md                   # Main documentation
├── SETUP.md                    # Detailed setup guide
├── QUICKSTART.md               # Quick start guide
└── PROJECT_STRUCTURE.md        # This file
```

## Key Features by File

### Frontend Pages
- **`app/page.tsx`**: Landing page with navigation
- **`app/menu/page.tsx`**: Customer menu with real-time updates
- **`app/staff/page.tsx`**: Staff dashboard with order management
- **`app/qr-generator/page.tsx`**: QR code generation for tables

### Components
- **`MenuItemCard`**: Displays menu items with add/remove functionality
- **`Cart`**: Shopping cart with checkout
- **`CallWaiterButton`**: Button to call waiter

### State Management
- **`cartStore.ts`**: Zustand store for cart state

### Backend API Routes
- **`api/orders`**: Create and manage orders
- **`api/menu`**: CRUD operations for menu items
- **`api/categories`**: CRUD operations for categories
- **`api/waiter-call`**: Handle waiter calls

### Firebase Integration
- **`lib/firebase.ts`**: Client-side Firebase initialization
- **`lib/admin.ts`**: Server-side Firebase Admin SDK

### Types
All TypeScript interfaces are defined in `types/index.ts`:
- `MenuItem`, `Category`, `Order`, `CartItem`
- `WaiterCall`, `Staff`, `TableSession`
- `OrderStatus`, `StaffRole`

## Data Flow

1. **Customer Flow**:
   - Customer scans QR → `/menu?table=X`
   - Views menu → Adds items to cart → Places order
   - Order saved to Firestore → Staff sees it in real-time

2. **Staff Flow**:
   - Staff logs in → `/staff`
   - Views orders → Updates status (pending → preparing → ready → served)
   - Receives waiter calls → Resolves them

3. **Real-time Updates**:
   - Uses Firestore `onSnapshot()` for live updates
   - No polling needed - changes appear instantly

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## Next Steps for Enhancement

1. Add menu item image uploads
2. Implement Firebase Cloud Messaging for push notifications
3. Add order history for customers
4. Implement table session management
5. Add analytics and reporting
6. Create admin panel for menu management
7. Add payment integration
8. Implement order cancellation with reasons

