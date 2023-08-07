import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetSeed() {
  // Delete all data from the tables in reverse order
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seed data reset');
}

resetSeed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
