import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { HealthController } from './health.controller';

@Module({
  imports: [PrismaModule, TransactionsModule, WebhooksModule],
  controllers: [HealthController],
})
export class AppModule {}
