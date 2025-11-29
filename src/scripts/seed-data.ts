// Script to seed initial data to Firestore
// Run this with: npx ts-node src/scripts/seed-data.ts
// Make sure to set up Firebase Admin SDK credentials first

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { seedCategories, seedMenuItems } from '../data/menu';

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error('Missing Firebase Admin credentials. Please set environment variables.');
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const db = getFirestore(app);

async function seedData() {
  try {
    console.log('Starting data seed...');

    // Seed categories
    console.log('Seeding categories...');
    for (const category of seedCategories) {
      const { id, ...categoryData } = category;
      await db.collection('categories').doc(id).set(categoryData);
      console.log(`  ✓ Added category: ${category.name}`);
    }

    // Seed menu items
    console.log('Seeding menu items...');
    for (const item of seedMenuItems) {
      const { id, ...itemData } = item;
      await db.collection('menus').doc(id).set(itemData);
      console.log(`  ✓ Added menu item: ${item.name}`);
    }

    console.log('\n✅ Data seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();

