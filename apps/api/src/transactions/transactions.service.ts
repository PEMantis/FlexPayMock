/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// apps/api/src/transactions/transactions.service.ts
import { PrismaClient } from '@prisma/client';

// A dedicated PrismaClient instance for this service.
// (For a small test app this is fine; we can refactor to shared PrismaService later if needed.)
const prisma = new PrismaClient();

export type ListParams = {
  cursor?: string;
  limit: number;
  accountId?: string;
};

export type TxnPage = {
  items: any[];
  nextCursor: string | null;
};

export const TransactionsService = {
  async list(params: ListParams): Promise<TxnPage> {
    const { cursor, limit, accountId } = params;

    const items = await prisma.transaction.findMany({
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      ...(accountId ? { where: { accountId } } : {}),
      orderBy: { createdAt: 'desc' },
    });

    const nextCursor =
      items.length === limit ? items[items.length - 1].id : null;

    return { items, nextCursor };
  },
};
