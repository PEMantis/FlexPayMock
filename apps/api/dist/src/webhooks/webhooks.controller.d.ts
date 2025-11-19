import { Request } from 'express';
export declare class WebhooksController {
    private readonly log;
    private readonly secret;
    handleProcessorWebhook(req: Request & {
        rawBody?: Buffer;
    }, signature?: string): Promise<{
        ok: true;
    }>;
}
