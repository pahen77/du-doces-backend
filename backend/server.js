// Backend API for Du Doces
// Moved from repository root to backend/ folder.
// This file exposes product CRUD endpoints and basic delivery quotes and order creation.

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

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

/* ---------------------------------------------------------------------------
 * Entregas (mock)
 * Endpoints para cotar e criar pedidos de entrega. Estes endpoints retornam
 * valores simulados. Quando você quiser integrar com a API real da Lalamove,
 * substitua a lógica de cotação e criação por chamadas HTTP assinadas.
 *--------------------------------------------------------------------------*/

// Cotação de entrega
app.post('/delivery/quote', async (req, res) => {
  try {
    const { to, itemsTotal } = req.body || {};
    const cep = String(to?.cep || '').replace(/\D/g, '');
    if (!cep || cep.length !== 8) {
      return res.status(400).json({ error: 'CEP inválido' });
    }
    const total = Number(itemsTotal || 0);
    const fee = Math.max(7.9, Math.min(39.9, total * 0.08));
    return res.json({
      currency: 'BRL',
      fee: Number(fee.toFixed(2)),
      etaMinutes: 45,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao cotar entrega' });
  }
});

// Criar pedido de entrega
app.post('/delivery/create', async (req, res) => {
  try {
    const { to, cart } = req.body || {};
    const cep = String(to?.cep || '').replace(/\D/g, '');
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }
    if (!cep || cep.length !== 8) {
      return res.status(400).json({ error: 'CEP inválido' });
    }
    const orderId = 'DLV-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    // TODO: persistir orderId e payload no banco (prisma)
    return res.status(201).json({ orderId, status: 'created' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao criar entrega' });
  }
});

// Consultar status do pedido de entrega (mock)
app.get('/delivery/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    return res.json({ orderId: id, status: 'driver_assigned' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao consultar status' });
  }
});

// Porta configurável via .env
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});