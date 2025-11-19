import Fastify from "fastify";
import { createHmac } from "crypto";

const PORT = Number(process.env.PORT || 4801);
const WEBHOOK_URL =
  process.env.WEBHOOK_URL || "http://localhost:3000/webhooks/processor";
const SECRET = process.env.PROC_SECRET || "proc_secret";

const app = Fastify({ logger: true });

app.get("/health", async () => ({ ok: true, port: PORT }));

app.post("/processor/charge", async (req, reply) => {
  const body: any = (req as any).body || {};
  const id = `evt_${Date.now()}`;

  const auth = {
    type: "authorization.requested",
    id,
    amount_cents: body.amount_cents ?? 1234,
    mcc: body.mcc ?? "5812",
    card_last4: "4242",
  };

  await sendWebhookSafe(auth);

  setTimeout(async () => {
    const payload =
      Math.random() < 0.7
        ? {
            type: "clearing.settled",
            id: `cap_${id}`,
            auth_id: id,
            amount_cents: auth.amount_cents,
          }
        : {
            type: "authorization.reversed",
            id: `rev_${id}`,
            auth_id: id,
            amount_cents: auth.amount_cents,
          };
    await sendWebhookSafe(payload);
  }, 1500);

  return reply.send({ ok: true, sent: true, id });
});

async function sendWebhookSafe(payload: any) {
  try {
    const raw = JSON.stringify(payload);
    const sig = createHmac("sha256", SECRET).update(raw).digest("hex");
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-proc-signature": sig,
      },
      body: raw,
    });
    if (!res.ok) {
      app.log.warn({ status: res.status }, "Webhook delivery failed (non-2xx)");
    } else {
      app.log.info({ type: (payload && payload.type) || "?" }, "Webhook delivered");
    }
  } catch (err) {
    app.log.error({ err }, "Webhook delivery error (API probably not running yet)");
  }
}

app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => app.log.info(`processor-mock listening on :${PORT}`))
  .catch((e) => {
    app.log.error(e, "Failed to start processor-mock");
    process.exit(1);
  });
