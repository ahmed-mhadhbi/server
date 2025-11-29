# Quick Seed Instructions

## Step 1: Seed Menu Data via Firebase Console

### 1.1 Create Categories

1. Go to: https://console.firebase.google.com/project/server-8001c/firestore
2. Click **Start collection** (or **Add collection** if collections exist)
3. Collection ID: `categories`
4. Click **Next**

**Add these 4 documents:**

**Document 1:**
- Document ID: `appetizers`
- Fields:
  - `name` (string): `Appetizers`
  - `description` (string): `Start your meal right`
  - `order` (number): `1`

**Document 2:**
- Document ID: `mains`
- Fields:
  - `name` (string): `Main Courses`
  - `description` (string): `Hearty and delicious`
  - `order` (number): `2`

**Document 3:**
- Document ID: `desserts`
- Fields:
  - `name` (string): `Desserts`
  - `description` (string): `Sweet endings`
  - `order` (number): `3`

**Document 4:**
- Document ID: `beverages`
- Fields:
  - `name` (string): `Beverages`
  - `description` (string): `Drinks and refreshments`
  - `order` (number): `4`

### 1.2 Create Menu Items

1. Click **Start collection** again
2. Collection ID: `menus`
3. Click **Next**

**Add menu items (use auto-generated IDs or custom IDs):**

**Appetizers:**
- `name`: `Caesar Salad`, `description`: `Fresh romaine lettuce with caesar dressing, croutons, and parmesan`, `price`: `8.99`, `category`: `appetizers`, `available`: `true`
- `name`: `Mozzarella Sticks`, `description`: `Crispy fried mozzarella with marinara sauce`, `price`: `7.99`, `category`: `appetizers`, `available`: `true`
- `name`: `Buffalo Wings`, `description`: `Spicy chicken wings with blue cheese dip`, `price`: `12.99`, `category`: `appetizers`, `available`: `true`

**Main Courses:**
- `name`: `Classic Burger`, `description`: `Beef patty with lettuce, tomato, onion, and special sauce`, `price`: `14.99`, `category`: `mains`, `available`: `true`
- `name`: `Spaghetti Carbonara`, `description`: `Creamy pasta with bacon, eggs, and parmesan`, `price`: `16.99`, `category`: `mains`, `available`: `true`
- `name`: `Ribeye Steak`, `description`: `Grilled ribeye with mashed potatoes and vegetables`, `price`: `28.99`, `category`: `mains`, `available`: `true`
- `name`: `Grilled Salmon`, `description`: `Fresh salmon with lemon butter sauce and rice`, `price`: `22.99`, `category`: `mains`, `available`: `true`

**Desserts:**
- `name`: `Chocolate Cake`, `description`: `Rich chocolate cake with vanilla ice cream`, `price`: `7.99`, `category`: `desserts`, `available`: `true`
- `name`: `New York Cheesecake`, `description`: `Classic creamy cheesecake with berry compote`, `price`: `8.99`, `category`: `desserts`, `available`: `true`

**Beverages:**
- `name`: `Cola`, `description`: `Refreshing cola drink`, `price`: `2.99`, `category`: `beverages`, `available`: `true`
- `name`: `Fresh Lemonade`, `description`: `Homemade lemonade`, `price`: `3.99`, `category`: `beverages`, `available`: `true`
- `name`: `Coffee`, `description`: `Freshly brewed coffee`, `price`: `3.49`, `category`: `beverages`, `available`: `true`

---

## Step 2: Create Staff Users

### 2.1 Enable Email/Password Authentication

1. Go to: https://console.firebase.google.com/project/server-8001c/authentication
2. Click **Get started** (if first time) or go to **Sign-in method** tab
3. Click on **Email/Password**
4. Enable it and click **Save**

### 2.2 Add Staff Users

1. Go to **Users** tab
2. Click **Add user**
3. Enter email: `admin@resteau.com` (or your preferred email)
4. Enter password: (choose a strong password)
5. Click **Add user**

**Repeat for additional staff:**
- `waiter@resteau.com`
- `cook@resteau.com`
- etc.

---

## Step 3: Test Everything

1. **Start your app:**
   ```bash
   yarn dev
   ```

2. **Test Menu Page:**
   - Visit: http://localhost:3000/menu?table=1
   - You should see categories and menu items

3. **Test Staff Dashboard:**
   - Visit: http://localhost:3000/staff
   - Log in with one of the staff emails you created
   - You should see the dashboard

4. **Test Order Flow:**
   - On menu page, add items to cart
   - Click "Place Order"
   - Check staff dashboard - order should appear!

---

## Alternative: Use API Method (After Creating First Staff User)

If you want to use the API method after creating your first staff user:

1. Create one staff user first (Step 2)
2. Log in to your app at `/staff`
3. The API routes will work because you're authenticated
4. Run: `npx ts-node src/scripts/seed-via-api.ts`

But the manual method via Console is usually faster for initial setup!

---

## Done! 🎉

Your restaurant system is now ready with:
- ✅ Menu categories
- ✅ Menu items
- ✅ Staff users
- ✅ Ready to accept orders!

