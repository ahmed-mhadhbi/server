# Resteau Setup Guide

This guide will help you set up the Resteau digital restaurant system from scratch.

## Prerequisites

- Node.js 18+ installed
- A Firebase project (create one at https://console.firebase.google.com)
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Follow the setup wizard
4. Enable Google Analytics (optional)

### 2.2 Enable Firebase Services

#### Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (we'll update rules later)
4. Choose a location close to your users

#### Authentication
1. Go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" provider

#### Storage
1. Go to "Storage"
2. Click "Get started"
3. Start in **test mode** (we'll update rules later)

### 2.3 Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app (you can name it "Resteau Web")
5. Copy the Firebase configuration object

### 2.4 Set Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Optional - for server-side operations)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
```

**To get Admin SDK credentials:**
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values for the environment variables

### 2.5 Deploy Firestore Rules

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## Step 3: Seed Initial Data

You can seed the database with sample menu items and categories:

### Option A: Using the Seed Script (Requires Admin SDK)

```bash
# Make sure .env.local has Admin SDK credentials
npx ts-node src/scripts/seed-data.ts
```

### Option B: Manual Setup via Firebase Console

1. Go to Firestore Database
2. Create collections: `categories` and `menus`
3. Add documents manually or import from `src/data/menu.ts`

### Option C: Using the API

Once the app is running, you can use the API endpoints to add menu items:

```bash
# Add a category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Appetizers", "order": 1}'

# Add a menu item
curl -X POST http://localhost:3000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Caesar Salad",
    "description": "Fresh romaine lettuce",
    "price": 8.99,
    "category": "appetizers",
    "available": true
  }'
```

## Step 4: Create Staff Users

1. Go to Firebase Console → Authentication
2. Click "Add user"
3. Enter email and password
4. This user can now log in to the staff dashboard

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test the System

1. **Menu Page**: Visit `/menu?table=1` to see the customer menu
2. **Staff Dashboard**: Visit `/staff` and log in with a staff account
3. **QR Generator**: Visit `/qr-generator` to generate QR codes for tables

## Step 7: Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Firebase Hosting

```bash
# Build the app
npm run build

# Deploy
firebase deploy --only hosting
```

## Troubleshooting

### Firebase Connection Issues
- Make sure all environment variables are set correctly
- Check that Firestore is enabled in Firebase Console
- Verify the Firebase project ID matches

### Authentication Issues
- Ensure Email/Password provider is enabled
- Check that staff users are created in Firebase Console

### Real-time Updates Not Working
- Verify Firestore rules allow read access
- Check browser console for errors
- Ensure Firestore is in the correct mode (not locked)

## Next Steps

- Customize menu items and categories
- Add menu item images to Firebase Storage
- Set up Firebase Cloud Messaging for notifications
- Configure custom domain
- Set up analytics

## Support

For issues or questions, check the README.md or open an issue in the repository.

