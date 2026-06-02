# Imagen base ligera con Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero solo los manifests para aprovechar la cache de Docker:
# si no cambian, no se reinstalan las dependencias en cada build.
COPY package*.json ./

# Instalamos dependencias de produccion
RUN npm install --omit=dev

# Copiamos el resto del codigo fuente
COPY . .

# Puerto en el que escucha la API
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]