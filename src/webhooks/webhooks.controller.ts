import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('processor')
  @HttpCode(200)
  handleProcessor(@Body() body: any, @Headers() headers: Record<string,string>) {
    // In your real version, verify signature using headers + raw body
    return { ok: true, received_type: body?.type ?? null, headers };
  }
}
