# Usa Nginx como servidor web
FROM nginx:alpine

# Copia todo tu frontend al directorio público de Nginx
COPY . /usr/share/nginx/html

# Expón el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]

