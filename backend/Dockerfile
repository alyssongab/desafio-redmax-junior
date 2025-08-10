# instalacao das dependencias do projeto
FROM node:22.14.0-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
RUN npm install

# compila o codigo typescript
FROM base AS builder
WORKDIR /app
COPY . .

RUN npx prisma generate
RUN npm run build

# prepara imagem para prod
FROM node:22.14.0-alpine AS production
WORKDIR /app
RUN apk add --no-cache curl

COPY --from=base /app/package*.json ./
RUN npm install --omit=dev


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=builder /app/.env ./.env

EXPOSE 3001

CMD ["node", "dist/shared/http/server.js"]