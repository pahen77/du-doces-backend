# Du Doces Backend (Sprint)

Este projeto contém um esqueleto de API REST para o sistema Du Doces, implementado com **Node.js**, **Express** e **Prisma** (ORM para PostgreSQL). O objetivo é fornecer as operações básicas (CRUD) de produtos para serem consumidas pelo front‑end.

## Estrutura

* `server.js` – define as rotas REST (`/products`) para listar, criar, editar e excluir produtos.
* `prisma/schema.prisma` – define o modelo de dados `Product` e a configuração do banco.
* `prisma/seed.js` – script para popular o banco com uma lista de produtos de exemplo (os mesmos itens disponíveis no front). Execute com `npm run seed` após a migração.
* `package.json` – dependências e scripts. O projeto usa ES modules (`type: "module"`).
* `.env.example` – modelo de variáveis de ambiente. Renomeie para `.env` e preencha `DATABASE_URL` com a string de conexão do banco no Railway ou outro Postgres. Configure `PORT` se desejar.

## Como usar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure a variável `DATABASE_URL` no `.env`. No Railway, você encontrará essa informação na aba *Connect* do serviço de banco.

3. Gire as migrações e gere o cliente Prisma:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. Rode o script de seed (opcional):

   ```bash
   npm run seed
   ```

5. Inicie o servidor:

   ```bash
   npm run start
   ```

Por padrão, a API ficará acessível em `http://localhost:8080`. Se configurado no Railway, a porta e host serão definidos automaticamente.

## Endpoints

* **GET /products** – retorna todos os produtos.
* **POST /products** – cria um novo produto. Envie JSON no corpo com os campos descritos em `server.js`.
* **PUT /products/:id** – atualiza um produto existente.
* **DELETE /products/:id** – exclui um produto.

## Próximos passos

* Adicionar autenticação (JWT) para proteger rotas sensíveis.
* Implementar filtros de busca por categoria, marca e preço, retornando produtos de forma paginada.
* Criar endpoints para carrinho e lista de desejos, relacionados a usuários.
* Integração com serviços de pagamento e envio de pedidos.

### Observação

Este backend é um ponto de partida; adapte conforme as necessidades do negócio e conforme novas funcionalidades (login, checkout, IA) forem sendo desenvolvidas nas próximas sprints.