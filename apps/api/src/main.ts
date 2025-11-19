// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  // Capture raw body for JSON so we can verify HMAC signatures.
  // This attaches the raw Buffer to req.rawBody.
  app.use(
    json({
      verify: (req: any, _res, buf) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.rawBody = buf;
      },
    }),
  );
  app.use(urlencoded({ extended: true }));

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  console.log(`API listening on :${port}`);
}
bootstrap();
