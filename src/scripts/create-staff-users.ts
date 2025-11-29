// Script to create staff users in Firebase Authentication
// Run with: npx ts-node src/scripts/create-staff-users.ts
// Requires Firebase Admin SDK credentials

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error('❌ Missing Firebase Admin credentials.');
  console.error('\nPlease add these to your .env.local file:');
  console.error('FIREBASE_ADMIN_PROJECT_ID=server-8001c');
  console.error('FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email@server-8001c.iam.gserviceaccount.com');
  console.error('FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"');
  console.error('\nTo get these credentials:');
  console.error('1. Go to: https://console.firebase.google.com/project/server-8001c/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate new private key"');
  console.error('3. Download the JSON and extract the values');
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const auth = getAuth(app);

const staffUsers = [
  {
    email: 'admin@resteau.com',
    password: 'Admin123!@#',
    displayName: 'Admin User',
  },
  {
    email: 'waiter@resteau.com',
    password: 'Waiter123!@#',
    displayName: 'Waiter User',
  },
  {
    email: 'cook@resteau.com',
    password: 'Cook123!@#',
    displayName: 'Cook User',
  },
];

async function createStaffUsers() {
  try {
    console.log('👥 Creating staff users...\n');

    for (const user of staffUsers) {
      try {
        // Check if user already exists
        let userRecord;
        try {
          userRecord = await auth.getUserByEmail(user.email);
          console.log(`⚠️  User ${user.email} already exists, skipping...`);
          continue;
        } catch (error: any) {
          if (error.code !== 'auth/user-not-found') {
            throw error;
          }
        }

        // Create new user
        userRecord = await auth.createUser({
          email: user.email,
          password: user.password,
          displayName: user.displayName,
          emailVerified: true,
        });

        console.log(`✅ Created user: ${user.email}`);
        console.log(`   Password: ${user.password}`);
        console.log(`   UID: ${userRecord.uid}\n`);
      } catch (error: any) {
        console.error(`❌ Error creating user ${user.email}:`, error.message);
      }
    }

    console.log('✅ Staff user creation completed!');
    console.log('\n📝 Login credentials:');
    staffUsers.forEach((user) => {
      console.log(`   ${user.email} / ${user.password}`);
    });
    console.log('\n⚠️  Please change these passwords after first login!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createStaffUsers();

