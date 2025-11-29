# Vercel Deployment Settings

Use these exact settings when deploying to Vercel:

## Project Settings

### Framework Preset
- **Next.js** (auto-detected)

### Build & Development Settings

**Install Command:**
```
yarn install
```

**Build Command:**
```
yarn build
```

**Output Directory:**
```
.next
```
*(Leave as default - Vercel auto-detects this for Next.js)*

**Development Command:**
```
yarn dev
```

## Root Directory
- Leave as `./` (default)

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### For All Environments (Production, Preview, Development):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD-4UY-kbe7qM2LrXbRk79rMha0uTcszH8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=server-8001c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=server-8001c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=server-8001c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=300627073662
NEXT_PUBLIC_FIREBASE_APP_ID=1:300627073662:web:07e6e0884aaf7bb57d562f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-65MP6ZCM5P
```

## Quick Setup in Vercel Dashboard

1. **Import Project**
   - Repository: `ahmed-mhadhbi/server`
   - Framework: Next.js (auto)

2. **Build Settings** (should auto-detect, but verify):
   - Install Command: `yarn install`
   - Build Command: `yarn build`
   - Output Directory: `.next` (default)

3. **Environment Variables**
   - Add all Firebase variables listed above
   - Apply to: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Notes

- ✅ `vercel.json` is already configured with yarn commands
- ✅ Vercel will use these settings automatically
- ✅ You can override in Vercel dashboard if needed
- ✅ Next.js output directory is auto-detected

## Troubleshooting

**If build fails:**
- Check that `yarn.lock` is committed (it is)
- Verify environment variables are set
- Check build logs in Vercel dashboard

**If using npm instead:**
- You can change to `npm install` and `npm run build` in Vercel dashboard
- But yarn is recommended since that's what we used locally

