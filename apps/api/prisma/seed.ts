import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@local' },
    update: {},
    create: { email: 'demo@local', password: 'x' },
  });

  const account = await prisma.account.upsert({
    where: { id: 'demo-account' },
    update: {},
    create: {
      id: 'demo-account',
      userId: user.id,
      name: 'Demo Checking',
      currency: 'USD',
      balance: 100000,
    },
  });

  for (let i = 0; i < 8; i++) {
    await prisma.transaction.create({
      data: {
        accountId: account.id,
        kind: 'manual',
        amountCents: 1000 * (i + 1),
        mcc: '5812',
      },
    });
  }

  console.log('Seed complete');
}

main().finally(() => prisma.$disconnect());
