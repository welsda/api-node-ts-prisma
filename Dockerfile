# ---------- ETAPA 1: BUILD ----------
FROM node:18-bullseye-slim AS builder 
# Base Debian Bullseye com Node 18 (libssl1.1 incluído)

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos essenciais para instalar dependências
COPY package*.json tsconfig.json ./

# Instala dependências (prod + dev)
RUN npm install

# Copia todo o restante do código para dentro do container
COPY . .

# Gera o Prisma Client para o container
RUN npx prisma generate

# Compila TypeScript para JavaScript
RUN npm run build

# ---------- ETAPA 2: IMAGEM FINAL PARA PRODUÇÃO ----------
FROM node:18-bullseye-slim

# Define diretório de trabalho
WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expõe a porta da API
EXPOSE 3000

# Comando padrão para rodar em produção
CMD ["node", "dist/index.js"]

# Comentário:
# - Multi-stage build: a primeira etapa compila e gera Prisma Client,
#   a segunda etapa só pega os arquivos finais, deixando a imagem leve.
# - SQLite será persistido via volume no docker-compose.
# - Hot reload em dev será configurado via docker-compose.override.yml
