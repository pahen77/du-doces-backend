import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Inicializa servidor e banco
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

/*
 * GET /products
 * Retorna a lista de produtos cadastrados ordenada pelo campo createdAt.
 */
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

/*
 * POST /products
 * Cria um novo produto. Espera receber JSON com os campos
 * name, brand, category, price, imageUrl (opcional), promo (booleano),
 * unitType, size, flavor e packQty (opcional).
 */
app.post('/products', async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

/*
 * PUT /products/:id
 * Atualiza um produto existente.
 */
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({ where: { id }, data: req.body });
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

/*
 * DELETE /products/:id
 * Remove um produto.
 */
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

// Porta configurável via .env
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});