# Usa la imagen oficial de Node.js
FROM node:14

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependenciasgit
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa tu backend (asegúrate que sea 3000 en tu app)
EXPOSE 3000

# Comando para iniciar tu backend
CMD ["node", "server.js"]
