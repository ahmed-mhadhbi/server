# How to Get Firebase Admin SDK Credentials

To run the automated seeding scripts, you need Firebase Admin SDK credentials.

## Step-by-Step Guide

### Step 1: Go to Service Accounts

1. Open: https://console.firebase.google.com/project/server-8001c/settings/serviceaccounts/adminsdk
2. Or navigate: Firebase Console → Project Settings → Service Accounts

### Step 2: Generate Private Key

1. Click **Generate new private key** button
2. A warning dialog will appear - click **Generate key**
3. A JSON file will download automatically

### Step 3: Extract Credentials

Open the downloaded JSON file. It will look like this:

```json
{
  "type": "service_account",
  "project_id": "server-8001c",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@server-8001c.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

### Step 4: Add to .env.local

Add these three lines to your `.env.local` file:

```env
FIREBASE_ADMIN_PROJECT_ID=server-8001c
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@server-8001c.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Important:**
- Copy the `private_key` value EXACTLY as it appears (with `\n` characters)
- Keep the quotes around the private key
- Use the actual values from your JSON file

### Step 5: Run the Script

```bash
npx ts-node src/scripts/seed-and-create-users.ts
```

This will:
- ✅ Create all categories
- ✅ Create all menu items
- ✅ Create staff users (admin@resteau.com, waiter@resteau.com, cook@resteau.com)

## Security Note

⚠️ **Never commit `.env.local` to git!** It's already in `.gitignore`.

The Admin SDK credentials give full access to your Firebase project, so keep them secure.

