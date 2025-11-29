# Deployment Guide - Vercel

This guide will help you deploy your Resteau application to Vercel.

## Prerequisites

✅ Code pushed to GitHub: https://github.com/ahmed-mhadhbi/server.git

## Step 1: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select your repository: `ahmed-mhadhbi/server`
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (or `yarn build`)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (or `yarn install`)

4. **Add Environment Variables**
   Click **"Environment Variables"** and add these:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD-4UY-kbe7qM2LrXbRk79rMha0uTcszH8
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=server-8001c.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=server-8001c
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=server-8001c.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=300627073662
   NEXT_PUBLIC_FIREBASE_APP_ID=1:300627073662:web:07e6e0884aaf7bb57d562f
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-65MP6ZCM5P
   ```

   **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**
   - Click **"Deploy"**
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at: `https://your-project-name.vercel.app`

### Option B: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
   vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
   vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Step 2: Configure Firebase for Production

### Update Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com/project/server-8001c/firestore/rules)
2. Make sure your production rules are deployed
3. Or deploy via CLI:
   ```bash
   npx firebase deploy --only firestore:rules
   ```

### Update Storage Rules

1. Go to [Firebase Console](https://console.firebase.google.com/project/server-8001c/storage/rules)
2. Deploy storage rules:
   ```bash
   npx firebase deploy --only storage:rules
   ```

### Configure CORS (if needed)

If you encounter CORS issues, update your Firebase project settings to allow your Vercel domain.

## Step 3: Test Your Deployment

1. **Visit your Vercel URL**
   - Example: `https://your-project.vercel.app`

2. **Test Menu Page**
   - Visit: `https://your-project.vercel.app/menu?table=1`
   - Should display menu items

3. **Test Staff Dashboard**
   - Visit: `https://your-project.vercel.app/staff`
   - Login with staff credentials

4. **Test QR Generator**
   - Visit: `https://your-project.vercel.app/qr-generator`
   - Generate QR codes

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project → **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Firebase Auth Domain**
   - Go to Firebase Console → Authentication → Settings
   - Add your custom domain to authorized domains

## Troubleshooting

### Build Fails

**Error: Module not found**
- Make sure all dependencies are in `package.json`
- Check that `node_modules` is in `.gitignore`

**Error: Environment variables missing**
- Verify all Firebase env vars are set in Vercel
- Make sure they're added for all environments

### Runtime Errors

**Firebase connection issues**
- Verify environment variables are correct
- Check Firebase project settings
- Ensure Firestore/Storage rules are deployed

**CORS errors**
- Add your Vercel domain to Firebase authorized domains
- Check Firebase project settings

### Performance

**Slow initial load**
- Enable Vercel Edge Functions (if needed)
- Optimize images
- Use Next.js Image component (already implemented)

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] Menu page loads correctly
- [ ] Staff dashboard accessible
- [ ] Orders can be placed
- [ ] Real-time updates working
- [ ] QR generator functional

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- **Main branch** → Production
- **Other branches** → Preview deployments

Just push your changes:
```bash
git add .
git commit -m "Your changes"
git push
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Firebase Setup: See `SETUP.md`

---

**Your app is now live! 🚀**

Visit your Vercel URL to see your restaurant system in action.

