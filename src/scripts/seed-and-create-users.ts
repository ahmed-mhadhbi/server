// Combined script to seed data AND create staff users
// Run with: npx ts-node --project tsconfig.scripts.json src/scripts/seed-and-create-users.ts

import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
dotenv.config({ path: resolve(__dirname, '../../.env.local') });

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { seedCategories, seedMenuItems } from '../data/menu';

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error('❌ Missing Firebase Admin credentials.');
  console.error('\n📋 To get Admin SDK credentials:');
  console.error('1. Go to: https://console.firebase.google.com/project/server-8001c/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate new private key"');
  console.error('3. Download the JSON file');
  console.error('4. Add these to your .env.local:');
  console.error('   FIREBASE_ADMIN_PROJECT_ID=server-8001c');
  console.error('   FIREBASE_ADMIN_CLIENT_EMAIL=<from JSON file>');
  console.error('   FIREBASE_ADMIN_PRIVATE_KEY="<from JSON file, keep quotes and \\n>"');
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const db = getFirestore(app);
const auth = getAuth(app);

async function seedData() {
  console.log('🌱 Seeding menu data...\n');

  // Seed categories
  console.log('📁 Creating categories...');
  for (const category of seedCategories) {
    const { id, ...categoryData } = category;
    try {
      await db.collection('categories').doc(id).set(categoryData);
      console.log(`  ✅ ${category.name}`);
    } catch (error: any) {
      console.log(`  ⚠️  ${category.name} - ${error.message}`);
    }
  }

  // Seed menu items
  console.log('\n🍽️  Creating menu items...');
  for (const item of seedMenuItems) {
    const { id, ...itemData } = item;
    try {
      await db.collection('menus').doc(id).set(itemData);
      console.log(`  ✅ ${item.name}`);
    } catch (error: any) {
      console.log(`  ⚠️  ${item.name} - ${error.message}`);
    }
  }
}

async function createStaffUsers() {
  console.log('\n👥 Creating staff users...\n');

  const staffUsers = [
    { email: 'admin@resteau.com', password: 'Admin123!@#', displayName: 'Admin User' },
    { email: 'waiter@resteau.com', password: 'Waiter123!@#', displayName: 'Waiter User' },
    { email: 'cook@resteau.com', password: 'Cook123!@#', displayName: 'Cook User' },
  ];

  for (const user of staffUsers) {
    try {
      // Check if user exists
      try {
        await auth.getUserByEmail(user.email);
        console.log(`  ⚠️  ${user.email} already exists, skipping...`);
        continue;
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') throw error;
      }

      // Create user
      await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        emailVerified: true,
      });
      console.log(`  ✅ ${user.email} (Password: ${user.password})`);
    } catch (error: any) {
      console.log(`  ❌ ${user.email} - ${error.message}`);
    }
  }
}

async function main() {
  try {
    await seedData();
    await createStaffUsers();
    
    console.log('\n✅ All done! 🎉\n');
    console.log('📝 Staff login credentials:');
    console.log('   admin@resteau.com / Admin123!@#');
    console.log('   waiter@resteau.com / Waiter123!@#');
    console.log('   cook@resteau.com / Cook123!@#');
    console.log('\n⚠️  Please change passwords after first login!');
    console.log('\n🚀 Test your app: yarn dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

