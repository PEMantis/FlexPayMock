/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// apps/api/src/transactions/transactions.controller.ts
import { Controller, Get, Query, Logger, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);

  // NOTE: no constructor, no DI. We call the singleton directly.

  @Get()
  async list(
    @Query('cursor') cursor?: string,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('accountId') accountId?: string,
  ) {
    this.logger.log(
      `GET /transactions cursor=${cursor ?? 'NONE'} limit=${limit} accountId=${
        accountId ?? 'NONE'
      }`,
    );

    const result = await TransactionsService.list({ cursor, limit, accountId });

    // result is { items, nextCursor }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
}
