// Alternative seed script that uses API routes (no Admin SDK needed)
// Run with: npx ts-node src/scripts/seed-via-api.ts

import { seedCategories, seedMenuItems } from '../data/menu';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function seedViaAPI() {
  try {
    console.log('🌱 Starting data seed via API...\n');

    // Seed categories
    console.log('📁 Seeding categories...');
    for (const category of seedCategories) {
      const { id, ...categoryData } = category;
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`  ✅ Added category: ${category.name} (ID: ${result.categoryId || id})`);
        } else {
          const error = await response.json();
          console.log(`  ⚠️  Failed to add category: ${category.name} - ${error.error}`);
        }
      } catch (error: any) {
        console.log(`  ❌ Error adding category ${category.name}: ${error.message}`);
      }
    }

    console.log('\n🍽️  Seeding menu items...');
    // Seed menu items
    for (const item of seedMenuItems) {
      const { id, ...itemData } = item;
      try {
        const response = await fetch(`${API_BASE_URL}/api/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`  ✅ Added menu item: ${item.name} (ID: ${result.menuId || id})`);
        } else {
          const error = await response.json();
          console.log(`  ⚠️  Failed to add menu item: ${item.name} - ${error.error}`);
        }
      } catch (error: any) {
        console.log(`  ❌ Error adding menu item ${item.name}: ${error.message}`);
      }
    }

    console.log('\n✅ Data seed completed!');
    console.log('\n📝 Note: Make sure your Next.js dev server is running (yarn dev)');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedViaAPI();

