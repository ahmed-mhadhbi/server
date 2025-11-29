# Resteau - Digital Restaurant System

A modern digital restaurant system with QR menus, real-time orders, and staff dashboard.

## Features

- 📱 Customer-facing QR menu
- 🛒 Shopping cart
- 📦 Real-time order tracking
- 🔔 Call waiter feature
- 👨‍💼 Staff dashboard with real-time updates
- 🎫 QR code generator

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Notifications**: Firebase Cloud Messaging

## Getting Started

1. Install dependencies:
```bash
npm install
# or use yarn (recommended for Windows users)
yarn install
```

**Note**: If you encounter file locking issues on Windows during `npm install`, use `yarn install` instead.

2. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config to `.env.local` (see `.env.example`)

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── menu/         # Customer menu page
│   ├── staff/        # Staff dashboard
│   ├── qr-generator/ # QR code generator
│   └── api/          # API routes
├── components/       # React components
├── lib/             # Utilities and Firebase config
├── types/           # TypeScript types
└── data/            # Seed data
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

Or use Firebase Hosting:
```bash
firebase deploy
```

