import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTopMenus() {
  try {
    // Create 4 top menus
    const topMenus = await prisma.topMenu.createMany({
      data: [
        { name: 'Main Menu' },
        { name: 'Sidebar Menu' },
        { name: 'Footer Menu' },
        { name: 'Admin Menu' },
      ],
    });

    console.log('Created top menus:', topMenus);
  } catch (error) {
    console.error('Error seeding top menus:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

seedTopMenus();
