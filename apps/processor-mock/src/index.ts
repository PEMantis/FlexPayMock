import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/health', async () => ({ ok: true }));

app.post('/processor/charge', async (req, reply) => {
  const body = (req.body ?? {}) as { amount_cents?: number; mcc?: string };
  if (typeof body.amount_cents !== 'number') {
    return reply.code(400).send({ ok: false, error: 'amount_cents must be number' });
  }
  const id = `evt_${Date.now()}`;
  return { ok: true, id, amount_cents: body.amount_cents, mcc: body.mcc ?? null, status: 'authorized' };
});

const PORT = Number(process.env.MOCK_PORT ?? 4801);
app.listen({ port: PORT, host: '0.0.0.0' })
  .then(() => app.log.info(`mock listening on :${PORT}`))
  .catch((err) => { app.log.error(err); process.exit(1); });
