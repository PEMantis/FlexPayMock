import {
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

type AuthorizationRequested = {
  type: 'authorization.requested';
  id: string;
  amount_cents: number;
  mcc: string;
  card_last4: string;
};

type AuthorizationReversed = {
  type: 'authorization.reversed';
  id: string;
  auth_id: string;
  amount_cents: number;
};

type ClearingSettled = {
  type: 'clearing.settled';
  id: string;
  auth_id: string;
  amount_cents: number;
};

type RefundSettled = {
  type: 'refund.settled';
  id: string;
  orig_id?: string;
  amount_cents: number;
};

type ProcessorEvent =
  | AuthorizationRequested
  | AuthorizationReversed
  | ClearingSettled
  | RefundSettled;

@Controller('webhooks')
export class WebhooksController {
  private readonly log = new Logger(WebhooksController.name);
  private readonly secret = process.env.PROC_SECRET || 'proc_secret';

  /**
   * POST /webhooks/processor
   * Verifies HMAC signature and logs the event.
   */
  @Post('processor')
  @HttpCode(200)
  async handleProcessorWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('x-proc-signature') signature?: string,
  ): Promise<{ ok: true }> {
    // 1) Basic guards
    if (!req.rawBody || !signature) {
      throw new BadRequestException('Missing raw body or signature');
    }

    // 2) Compute HMAC over the raw JSON payload
    const computed = createHmac('sha256', this.secret)
      .update(req.rawBody)
      .digest('hex');

    // 3) Constant-time compare to prevent timing attacks
    const sigBuf = Buffer.from(signature, 'hex');
    const cmpBuf = Buffer.from(computed, 'hex');
    const match =
      sigBuf.length === cmpBuf.length && timingSafeEqual(sigBuf, cmpBuf);

    if (!match) {
      this.log.warn({ signature, computed }, 'Invalid webhook signature');
      throw new BadRequestException('Invalid signature');
    }

    // 4) At this point, body has been parsed by express.json()
    const event = req.body as ProcessorEvent;

    // 5) TODOs below will become real work (ledgering, idempotency).
    switch (event.type) {
      case 'authorization.requested':
        this.log.log({
          msg: 'Auth hold placed',
          id: event.id,
          amount_cents: event.amount_cents,
          mcc: event.mcc,
          last4: event.card_last4,
        });
        // TODO: insert transaction; ledger: debit holds, credit cash
        break;

      case 'authorization.reversed':
        this.log.log({
          msg: 'Auth reversed',
          id: event.id,
          auth_id: event.auth_id,
          amount_cents: event.amount_cents,
        });
        // TODO: reverse ledger for the hold
        break;

      case 'clearing.settled':
        this.log.log({
          msg: 'Capture/settlement',
          id: event.id,
          auth_id: event.auth_id,
          amount_cents: event.amount_cents,
        });
        // TODO: ledger: debit card_spend, credit holds
        break;

      case 'refund.settled':
        this.log.log({
          msg: 'Refund settled',
          id: event.id,
          orig_id: event.orig_id,
          amount_cents: event.amount_cents,
        });
        // TODO: ledger: debit cash, credit refunds (or reverse spend)
        break;

      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        this.log.warn({ type: (event as any).type }, 'Unknown event type');
        throw new BadRequestException('Unsupported event type');
    }

    await Promise.resolve();
    // 6) Respond 200 so the sender doesn’t retry
    return { ok: true };
  }
}
