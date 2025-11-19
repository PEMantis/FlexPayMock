"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WebhooksController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let WebhooksController = WebhooksController_1 = class WebhooksController {
    log = new common_1.Logger(WebhooksController_1.name);
    secret = process.env.PROC_SECRET || 'proc_secret';
    async handleProcessorWebhook(req, signature) {
        if (!req.rawBody || !signature) {
            throw new common_1.BadRequestException('Missing raw body or signature');
        }
        const computed = (0, crypto_1.createHmac)('sha256', this.secret)
            .update(req.rawBody)
            .digest('hex');
        const sigBuf = Buffer.from(signature, 'hex');
        const cmpBuf = Buffer.from(computed, 'hex');
        const match = sigBuf.length === cmpBuf.length && (0, crypto_1.timingSafeEqual)(sigBuf, cmpBuf);
        if (!match) {
            this.log.warn({ signature, computed }, 'Invalid webhook signature');
            throw new common_1.BadRequestException('Invalid signature');
        }
        const event = req.body;
        switch (event.type) {
            case 'authorization.requested':
                this.log.log({
                    msg: 'Auth hold placed',
                    id: event.id,
                    amount_cents: event.amount_cents,
                    mcc: event.mcc,
                    last4: event.card_last4,
                });
                break;
            case 'authorization.reversed':
                this.log.log({
                    msg: 'Auth reversed',
                    id: event.id,
                    auth_id: event.auth_id,
                    amount_cents: event.amount_cents,
                });
                break;
            case 'clearing.settled':
                this.log.log({
                    msg: 'Capture/settlement',
                    id: event.id,
                    auth_id: event.auth_id,
                    amount_cents: event.amount_cents,
                });
                break;
            case 'refund.settled':
                this.log.log({
                    msg: 'Refund settled',
                    id: event.id,
                    orig_id: event.orig_id,
                    amount_cents: event.amount_cents,
                });
                break;
            default:
                this.log.warn({ type: event.type }, 'Unknown event type');
                throw new common_1.BadRequestException('Unsupported event type');
        }
        await Promise.resolve();
        return { ok: true };
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)('processor'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('x-proc-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleProcessorWebhook", null);
exports.WebhooksController = WebhooksController = WebhooksController_1 = __decorate([
    (0, common_1.Controller)('webhooks')
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map