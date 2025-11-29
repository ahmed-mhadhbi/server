# Quick Start Guide

Get Resteau up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode)
3. Enable **Authentication** → Email/Password
4. Enable **Storage** (start in test mode)
5. Get your Firebase config from Project Settings → Your apps → Web app

## 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4. Add Sample Data

### Option A: Via Firebase Console
1. Go to Firestore Database
2. Create collection `categories` with document:
   ```json
   {
     "name": "Main Courses",
     "order": 1
   }
   ```
3. Create collection `menus` with document:
   ```json
   {
     "name": "Burger",
     "description": "Delicious burger",
     "price": 14.99,
     "category": "mains",
     "available": true
   }
   ```

### Option B: Use Seed Script
```bash
# Set Admin SDK credentials in .env.local first
npx ts-node src/scripts/seed-data.ts
```

## 5. Create Staff User

1. Firebase Console → Authentication
2. Click "Add user"
3. Enter email and password

## 6. Run the App

```bash
npm run dev
```

Visit:
- **Home**: http://localhost:3000
- **Menu**: http://localhost:3000/menu?table=1
- **Staff**: http://localhost:3000/staff
- **QR Generator**: http://localhost:3000/qr-generator

## 7. Test the Flow

1. Open `/menu?table=1` in one browser
2. Add items to cart and place order
3. Open `/staff` in another browser/tab
4. Log in and see the order appear in real-time!
5. Update order status from "pending" → "preparing" → "ready" → "served"

## That's It! 🎉

Your restaurant system is ready. For detailed setup, see [SETUP.md](./SETUP.md).

