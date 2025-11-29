# Seed Data and Create Staff Users Guide

This guide will help you populate your Firestore database with initial menu data and create staff users.

## Method 1: Seed Data via API (Recommended - No Admin SDK needed)

This method uses the API routes we created, so you don't need Firebase Admin SDK credentials.

### Step 1: Start the Development Server

```bash
yarn dev
```

Keep this running in one terminal.

### Step 2: Run the Seed Script

In a new terminal:

```bash
npx ts-node src/scripts/seed-via-api.ts
```

This will:
- ✅ Create 4 categories (Appetizers, Main Courses, Desserts, Beverages)
- ✅ Create 12 menu items across all categories

### What Gets Created

**Categories:**
- Appetizers
- Main Courses
- Desserts
- Beverages

**Menu Items:**
- **Appetizers:** Caesar Salad, Mozzarella Sticks, Buffalo Wings
- **Main Courses:** Classic Burger, Spaghetti Carbonara, Ribeye Steak, Grilled Salmon
- **Desserts:** Chocolate Cake, New York Cheesecake
- **Beverages:** Cola, Fresh Lemonade, Coffee

---

## Method 2: Seed Data via Firebase Console (Manual)

If you prefer to add data manually:

### Step 1: Go to Firestore Database

1. Open [Firebase Console](https://console.firebase.google.com/project/server-8001c/firestore)
2. Click **Firestore Database**

### Step 2: Create Categories Collection

1. Click **Start collection**
2. Collection ID: `categories`
3. Add documents with these IDs and data:

**Document ID: `appetizers`**
```json
{
  "name": "Appetizers",
  "description": "Start your meal right",
  "order": 1
}
```

**Document ID: `mains`**
```json
{
  "name": "Main Courses",
  "description": "Hearty and delicious",
  "order": 2
}
```

**Document ID: `desserts`**
```json
{
  "name": "Desserts",
  "description": "Sweet endings",
  "order": 3
}
```

**Document ID: `beverages`**
```json
{
  "name": "Beverages",
  "description": "Drinks and refreshments",
  "order": 4
}
```

### Step 3: Create Menu Items Collection

1. Click **Start collection**
2. Collection ID: `menus`
3. Add documents (you can use auto-generated IDs or custom IDs):

**Example Menu Item:**
```json
{
  "name": "Caesar Salad",
  "description": "Fresh romaine lettuce with caesar dressing, croutons, and parmesan",
  "price": 8.99,
  "category": "appetizers",
  "available": true
}
```

See `src/data/menu.ts` for all menu items.

---

## Method 3: Seed Data via Admin SDK (Advanced)

If you have Firebase Admin SDK credentials set up:

### Step 1: Add Admin SDK Credentials to .env.local

```env
FIREBASE_ADMIN_PROJECT_ID=server-8001c
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email@server-8001c.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**To get these credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com/project/server-8001c/settings/serviceaccounts/adminsdk)
2. Click **Generate new private key**
3. Download the JSON file
4. Extract the values:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep the quotes and \n)

### Step 2: Run the Seed Script

```bash
npx ts-node src/scripts/seed-data.ts
```

---

## Create Staff Users

### Step 1: Go to Firebase Authentication

1. Open [Firebase Console](https://console.firebase.google.com/project/server-8001c/authentication)
2. Click **Authentication** in the left menu
3. Make sure **Email/Password** provider is enabled

### Step 2: Add Staff Users

1. Click **Add user** button
2. Enter email (e.g., `admin@resteau.com`)
3. Enter password (make it strong!)
4. Click **Add user**

### Step 3: Add More Staff (Optional)

Repeat for additional staff:
- `waiter1@resteau.com`
- `waiter2@resteau.com`
- `cook@resteau.com`
- etc.

### Step 4: Test Staff Login

1. Start your app: `yarn dev`
2. Go to http://localhost:3000/staff
3. Log in with one of the staff emails you created
4. You should see the staff dashboard!

---

## Quick Setup Script

I've created a helper script that uses the API method. Here's the complete process:

```bash
# Terminal 1: Start the dev server
yarn dev

# Terminal 2: Seed the data
npx ts-node src/scripts/seed-via-api.ts
```

Then create staff users manually in Firebase Console.

---

## Verify Everything Works

1. **Check Menu Data:**
   - Visit http://localhost:3000/menu?table=1
   - You should see categories and menu items

2. **Check Staff Dashboard:**
   - Visit http://localhost:3000/staff
   - Log in with a staff account
   - You should see the dashboard (empty orders list is normal)

3. **Test Order Flow:**
   - Add items to cart on menu page
   - Place an order
   - Check staff dashboard - order should appear!

---

## Troubleshooting

### "Permission denied" when seeding
- Make sure Firestore rules are deployed
- Check that the dev server is running if using API method

### "Cannot find module" when running seed script
- Make sure you're in the project root directory
- Run `yarn install` if needed

### Staff can't log in
- Verify Email/Password provider is enabled in Firebase Console
- Check that the user was created successfully
- Make sure you're using the correct email/password

---

## Next Steps

After seeding data and creating staff users:
1. ✅ Test the menu page
2. ✅ Test placing an order
3. ✅ Test staff dashboard
4. ✅ Customize menu items in Firebase Console
5. ✅ Add more staff users as needed

Happy coding! 🚀

