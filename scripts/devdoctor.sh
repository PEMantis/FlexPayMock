#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG="$ROOT/.dev/devdoctor.log"
mkdir -p "$ROOT/.dev"
echo "> devdoctor $(date)" > "$LOG"

say(){ echo "▶ $*"; echo "▶ $*" >> "$LOG"; }
ok(){  echo "✅ $*"; echo "✅ $*" >> "$LOG"; }
warn(){ echo "⚠️  $*"; echo "⚠️  $*" >> "$LOG"; }
err(){ echo "❌ $*" >&2; echo "❌ $*" >> "$LOG"; }

# ---------- API: ensure deps, schema, scripts ----------
say "API: verifying workspace"
API="$ROOT/apps/api"
mkdir -p "$API"

cd "$API"
[ -f package.json ] || npm init -y >/dev/null 2>&1
npm pkg set name="flexpay-api" private=true type="module" >/dev/null

# runtime + toolchain pinned for Prisma v6 + Nest
npm i -s @nestjs/common @nestjs/core @nestjs/platform-express rxjs reflect-metadata express @prisma/client@6.19.0
npm i -D -s prisma@6.19.0 typescript tsx @types/node @types/express ts-node-dev

# scripts
npm pkg set scripts.dev="tsx watch src/main.ts" >/dev/null
npm pkg set scripts.build="tsc -p tsconfig.json" >/dev/null
npm pkg set scripts.start="node dist/main.js" >/dev/null

# tsconfig (decorators)
if [ ! -f tsconfig.json ]; then
  cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "lib": ["ES2020"],
    "declaration": false,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules","dist"]
}
JSON
fi

# prisma schema + env
mkdir -p prisma
if ! grep -q 'datasource db' prisma/schema.prisma 2>/dev/null; then
  cat > prisma/schema.prisma <<'PRISMA'
datasource db { provider = "postgresql" url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }
PRISMA
fi
grep -q DATABASE_URL .env 2>/dev/null || echo 'DATABASE_URL="postgresql://dev:dev@127.0.0.1:5432/flexpay?schema=public"' >> .env

# prisma generate (local)
npx prisma format --schema prisma/schema.prisma >/dev/null
npx prisma generate --schema prisma/schema.prisma >/dev/null
ok "API: deps/scripts/prisma OK"

# ---------- WEB: align Angular 21 (or comment block below to stick to 20) ----------
say "WEB: verifying workspace"
WEB="$ROOT/apps/web"
mkdir -p "$WEB"
cd "$WEB"
[ -f package.json ] || npm init -y >/dev/null 2>&1
npm pkg set name="flexpay-web" private=true >/dev/null

# Angular 21 toolchain + runtime
npm i -s @angular/animations@21 @angular/common@21 @angular/compiler@21 @angular/core@21 \
        @angular/forms@21 @angular/platform-browser@21 @angular/platform-browser-dynamic@21 \
        @angular/router@21 rxjs@^7 zone.js tslib
npm i -D -s @angular/cli@21 @angular/build@21 @angular/compiler-cli@21 typescript @types/node

# minimal angular.json if missing
if [ ! -f angular.json ]; then
  cat > angular.json <<'JSON'
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "projects": {
    "web": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "architect": {
        "build": {
          "builder": "@angular/build:browser",
          "options": {
            "outputPath": "dist/web",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "assets": ["src/favicon.ico","src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": { "browserTarget": "web:build", "host": "0.0.0.0", "port": 4200 }
        }
      }
    }
  }
}
JSON
fi

# basic app skeleton if missing
mkdir -p src/assets
[ -f src/index.html ] || cat > src/index.html <<'HTML'
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>FlexPay Mini</title><base href="/"></head>
  <body><app-root></app-root></body>
</html>
HTML

[ -f src/styles.css ] || touch src/styles.css

if [ ! -f src/main.ts ]; then
  cat > src/main.ts <<'TS'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
}).catch(console.error);
TS
fi

mkdir -p src/app
[ -f src/app/app.routes.ts ] || cat > src/app/app.routes.ts <<'TS'
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent) },
  { path: '**', redirectTo: '' }
];
TS

[ -f src/app/app.component.ts ] || cat > src/app/app.component.ts <<'TS'
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `<header style="padding:12px;border-bottom:1px solid #ddd">
    <a routerLink="/">Home</a>
  </header><main style="padding:16px"><router-outlet/></main>`
})
export class AppComponent {}
TS

[ -f src/app/home.component.ts ] || cat > src/app/home.component.ts <<'TS'
import { Component } from '@angular/core';
@Component({
  standalone: true,
  template: `<h2>It works 🎉</h2>`
})
export class HomeComponent {}
TS

ok "WEB: Angular 21 toolchain & skeleton OK"

# ---------- Final tips ----------
cd "$ROOT"
ok "Dev Doctor finished. Now try: fp-down && fp-up"
