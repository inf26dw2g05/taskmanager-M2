FROM mysql:8.0

# Copiamos el script de seed dentro de la imagen
COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306