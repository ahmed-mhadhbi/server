# Automated Setup - Seed Data & Create Users

I've created scripts to automatically seed all menu data and create staff users. Here's how to use them:

## Quick Setup (5 minutes)

### Step 1: Get Firebase Admin SDK Credentials

1. **Go to Service Accounts:**
   - Open: https://console.firebase.google.com/project/server-8001c/settings/serviceaccounts/adminsdk
   - Or: Firebase Console → ⚙️ Project Settings → Service Accounts tab

2. **Generate Private Key:**
   - Click **"Generate new private key"** button
   - Click **"Generate key"** in the warning dialog
   - A JSON file will download (e.g., `server-8001c-firebase-adminsdk-xxxxx.json`)

3. **Open the JSON file** and copy these values:
   - `project_id` → Will be `server-8001c`
   - `client_email` → Something like `firebase-adminsdk-xxxxx@server-8001c.iam.gserviceaccount.com`
   - `private_key` → The entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### Step 2: Add Credentials to .env.local

Open your `.env.local` file and add these three lines at the end:

```env
FIREBASE_ADMIN_PROJECT_ID=server-8001c
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@server-8001c.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Important:**
- Replace the values with YOUR actual values from the JSON file
- Keep the quotes around the private key
- Keep the `\n` characters in the private key (they're newlines)

### Step 3: Run the Combined Script

```bash
npx ts-node src/scripts/seed-and-create-users.ts
```

This will:
- ✅ Create 4 categories (Appetizers, Main Courses, Desserts, Beverages)
- ✅ Create 12 menu items
- ✅ Create 3 staff users:
  - `admin@resteau.com` / `Admin123!@#`
  - `waiter@resteau.com` / `Waiter123!@#`
  - `cook@resteau.com` / `Cook123!@#`

### Step 4: Test Everything

```bash
yarn dev
```

Then visit:
- **Menu:** http://localhost:3000/menu?table=1
- **Staff:** http://localhost:3000/staff (login with any staff account above)

## Alternative: Manual Setup

If you prefer to do it manually (no credentials needed):
- Follow `QUICK_SEED_INSTRUCTIONS.md`

## Troubleshooting

**"Missing Firebase Admin credentials" error:**
- Make sure you added all three variables to `.env.local`
- Check that the private key has quotes and `\n` characters
- Restart your terminal after editing `.env.local`

**"Permission denied" error:**
- Make sure Firestore rules are deployed
- Check that the service account has proper permissions

## Security Note

⚠️ The Admin SDK credentials give full access to your Firebase project. Never commit `.env.local` to git (it's already in `.gitignore`).

