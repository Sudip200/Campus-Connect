# --- deps stage ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# --- build stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy everything including .env
COPY frontend/ . 
COPY frontend/.env.production .env.production

COPY --from=deps /app/node_modules ./node_modules

# .env must exist before build
RUN npm run build

# --- runner stage ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
