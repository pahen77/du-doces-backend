// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient, Prisma } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// ---- Config ----
const PORT = process.env.PORT || 3000;

// ORIGIN pode ser uma lista separada por vírgulas
const ORIGIN_ENV = (process.env.ORIGIN || '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// ---- Middlewares ----
app.use(cors({
  origin: ORIGIN_ENV.length ? ORIGIN_ENV : '*',
  credentials: true,
}));
app.use(express.json());

// ---- Health ----
app.get('/health', async (req, res) => {
  try {
    // pequena query pra validar conexão com o DB
    await prisma.$queryRaw(Prisma.sql`SELECT 1`);
    res.json({ ok: true, db: true, ts: Date.now() });
  } catch (e) {
    res.status(500).json({ ok: false, db: false, error: String(e?.message || e) });
  }
});

// ---- Rotas ----
app.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (e) { next(e); }
});

app.get('/brands', async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
    res.json(brands);
  } catch (e) { next(e); }
});

app.get('/products', async (req, res, next) => {
  try {
    const {
      category,
      brand,
      q,
      promo,
      order = 'price_asc',
      page = '1',
      pageSize = '20',
    } = req.query;

    const where = {};
    if (category) where.category = { slug: String(category) };
    if (brand) where.brand = { slug: String(brand) };
    if (promo === 'true') where.promo = true;
    if (q) where.name = { contains: String(q), mode: 'insensitive' };

    const [field, dir] = String(order).split('_');
    const orderBy = {};
    if (['price', 'name', 'stock', 'createdAt'].includes(field)) {
      orderBy[field] = (dir === 'desc' ? 'desc' : 'asc');
    } else {
      orderBy['price'] = 'asc';
    }

    const take = Math.min(Math.max(parseInt(pageSize, 10) || 20, 1), 100);
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (pageNum - 1) * take;

    const [total, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: { category: true, brand: true },
      }),
    ]);

    res.json({
      total,
      page: pageNum,
      pageSize: take,
      items: items.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price), // Decimal -> number
        spec: p.spec,
        imageUrl: p.imageUrl,
        promo: p.promo,
        stock: p.stock,
        category: { slug: p.category.slug, name: p.category.name },
        brand: { slug: p.brand.slug, name: p.brand.name },
      })),
    });
  } catch (e) { next(e); }
});

app.get('/shipping/quote', (req, res) => {
  const { cep, weightKg = '1.2' } = req.query;
  const clean = String(cep || '').replace(/\D/g, '');
  if (clean.length !== 8) {
    return res.status(400).json({ error: 'CEP inválido. Use 8 dígitos.' });
  }
  const first = parseInt(clean[0], 10);
  const base = 12.90;
  const regionFactor = [1.0, 1.0, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40][first] || 1.25;
  const perKg = 3.50;
  const eta = Math.max(2, Math.round(2 + (first * 0.6)));
  const price = +(base * regionFactor + Number(weightKg) * perKg).toFixed(2);
  res.json({ price, eta });
});

// ---- Error handler ----
app.use((err, req, res, _next) => {
  console.error('API error:', err);
  res.status(500).json({ error: String(err?.message || err) });
});

// ---- Start ----
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on :${PORT}`);
});

// ---- Graceful shutdown ----
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
