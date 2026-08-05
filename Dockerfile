# ===== BUILD =====
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# ===== RUNTIME =====
FROM nginx:alpine

COPY --from=build /app/dist/e-commerce-test-ui/browser /usr/share/nginx/html

EXPOSE 80