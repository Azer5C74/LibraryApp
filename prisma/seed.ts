import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Ran',
      books: {
        create: [
          { title: 'Harry Potter' },
          { title: 'The Little Prince' },
          { title: 'Peter Pan' },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Andrea',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Monika',
    },
  });

  console.log('Seed data inserted:', { user1, user2, user3 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
