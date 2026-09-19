# MetriVerify

Unified Next.js application for Legal Metrology verification, inspection scheduling, and digital certificate issuance.

The Next.js UI, API, and Prisma schema run from one project. The browser talks to the same origin through `/api`.

## Setup

From this directory:

```powershell
npm install
npm run prisma:push
npm run prisma:seed
npm run dev
```

Open <http://localhost:3000>.

## Production

```powershell
npm run build
npm start
```

The database connection belongs in `.env.local`. Keep it local and never commit it.

The current migration keeps the remaining workflow modules behind an in-project compatibility router while they are converted to native `app/api` handlers. Authentication and health are already native Next route handlers.
