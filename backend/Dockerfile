FROM node:18-slim
WORKDIR /app

# 1) Copia os manifests do backend
COPY backend/package*.json ./

# 2) Instala deps (gera node_modules Linux)
RUN npm ci || npm install --omit=dev

# 3) Copia TODO o backend
COPY backend/. .

# 4) Copia o schema que está FORA do backend
#    Se o seu schema está na RAIZ do repo:
COPY schema.prisma ./schema.prisma
#    (Se estiver em /prisma/schema.prisma, use as 2 linhas abaixo e ajuste o --schema)
# RUN mkdir -p prisma
# COPY prisma ./prisma

# 5) Gera o Prisma Client DENTRO do container Linux
#    (ajuste o caminho se usar pasta prisma/)
RUN npx prisma generate --schema ./schema.prisma
# RUN npx prisma generate --schema ./prisma/schema.prisma

# 6) Evita problema de permissão ao chamar prisma em runtime
RUN chmod +x node_modules/.bin/prisma || true

ENV PORT=8080
EXPOSE 8080

# 7) Migra e sobe a API
#    Chamamos a CLI do prisma via node para evitar "Permission denied"
CMD sh -c "node node_modules/prisma/build/index.js migrate deploy --schema ./schema.prisma && node seed.js || true; node server.js"
# CMD sh -c "node node_modules/prisma/build/index.js migrate deploy --schema ./prisma/schema.prisma && node seed.js || true; node server.js"
