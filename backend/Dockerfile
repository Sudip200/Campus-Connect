
FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/server.js"]
