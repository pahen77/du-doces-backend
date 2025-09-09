# Du Doces — Backend (Node + Express + Prisma + PostgreSQL)

## Rodando local
```bash
cp .env.example .env
# edite DATABASE_URL, PORT e ORIGIN
npm install
npm run prisma:generate
npm run db:push
npm run db:seed
npm run dev
```

### Endpoints
- GET /health
- GET /categories
- GET /brands
- GET /products?category=slug&brand=slug&q=choco&promo=true&order=price_asc&page=1&pageSize=24
- GET /shipping/quote?cep=13000000&weightKg=1.2

## Railway/Render
- Crie Postgres
- Configure `DATABASE_URL`, `PORT=8080`, `ORIGIN` (URL do frontend)
- Deploy: `npm run prisma:generate && npm run db:push && npm run db:seed` e depois `npm start`
