# TaskManager API

API REST para gestión de proyectos y tareas personales, desarrollada para la asignatura **Desarrollo Web II — M1** (UMAIA, curso 2025/2026).

- **Grupo:** `inf25dw2g05`
- **Equipo:** Marcos Martínez Fernández (A048665), Francisco Capilla Sánchez (A048669)
- **Repositorio GitHub:** https://github.com/inf25dw2g05/taskmanager
- **Docker Hub:** https://hub.docker.com/u/inf25dw2g05

## Características principales

- Arquitectura REST con los cuatro verbos HTTP (GET, POST, PUT, DELETE).
- Tres recursos (`users`, `projects`, `tasks`) con dos relaciones 1:n.
- Respuestas en JSON.
- Autenticación y autorización mediante JWT, con hash de contraseñas usando bcrypt.
- Aislamiento por propietario: cada usuario solo accede a sus propios proyectos y tareas.
- Log en consola del usuario autenticado en cada petición protegida.
- Documentación OpenAPI 3.0 servida en `/docs` mediante Swagger UI.
- Colección Postman lista para importar y probar todos los endpoints.
- Despliegue multi-contenedor con Docker Compose (MySQL + Node.js).
- Base de datos preconfigurada con 30 registros por tabla.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Servidor aplicacional | Node.js 20 (Alpine) |
| Framework web | Express 5 |
| Base de datos | MySQL 8.0 |
| Driver MySQL | mysql2 (con pool) |
| Autenticación | jsonwebtoken (JWT) |
| Hash de contraseñas | bcryptjs |
| Documentación API | OpenAPI 3.0 + swagger-ui-express |
| Contenerización | Docker + Docker Compose |

## Imágenes en Docker Hub

El proyecto publica dos imágenes públicas en Docker Hub:

| Imagen | Repositorio |
|---|---|
| API Node.js | https://hub.docker.com/r/inf25dw2g05/taskmanager-app |
| MySQL con seed precargado | https://hub.docker.com/r/inf25dw2g05/taskmanager-mysql |

El `docker-compose.yml` está configurado para consumir estas imágenes directamente, por lo que **no es necesario construir nada localmente**.

## Cómo ejecutar el proyecto

### Requisitos previos

- Docker Desktop instalado y arrancado.

### Pasos

1. Clonar el repositorio o descargar el ZIP.
2. Copiar el archivo de plantilla de variables de entorno:

```bash
   cp .env.example .env
```

   El `.env.example` contiene valores razonables por defecto; se pueden modificar si se desea.

3. Levantar el sistema:

```bash
   docker compose up
```

   Docker descargará las imágenes desde Docker Hub la primera vez (`inf25dw2g05/taskmanager-app` y `inf25dw2g05/taskmanager-mysql`) y arrancará los dos contenedores.

4. Cuando aparezcan los mensajes `Connected to MySQL database` y `app running on localhost:3000`, la API estará lista.

### Puertos expuestos

| Servicio | Puerto host | Puerto contenedor |
|---|---|---|
| API REST | 3000 | 3000 |
| MySQL | 3307 | 3306 |

## Acceso a la API

### Swagger UI (documentación OpenAPI)

Abrir en el navegador: **http://localhost:3000/docs**

Desde Swagger UI se pueden:
- Consultar todos los endpoints organizados por tags (Auth, Users, Projects, Tasks).
- Ver los schemas, ejemplos y códigos de respuesta de cada endpoint.
- Probar los endpoints directamente (botón **Try it out**), incluyendo los protegidos (botón **Authorize** para introducir el token JWT).

### Usuarios de prueba

El seed crea 30 usuarios. Para la demo se destacan tres con credenciales conocidas:

| Email | Password |
|---|---|
| `demo1@taskmanager.com` | `demo1234` |
| `demo2@taskmanager.com` | `demo1234` |
| `demo3@taskmanager.com` | `demo1234` |

Cada uno tiene 2 proyectos asociados, con tareas dentro. El resto de usuarios (`alice`, `bob`, `carol`, etc.) usan la misma contraseña.

### Ejemplo de uso (curl / PowerShell)

Login:

```powershell
$r = Invoke-RestMethod -Method POST -Uri http://localhost:3000/auth/login `
  -ContentType "application/json" `
  -Body '{"email":"demo1@taskmanager.com","password":"demo1234"}'
```

Llamada a un endpoint protegido:

```powershell
Invoke-RestMethod -Method GET -Uri http://localhost:3000/projects `
  -Headers @{ "Authorization" = "Bearer $($r.token)" }
```

## Colección Postman

En `postman/taskmanager-api.postman_collection.json` se incluye una colección lista para importar:

1. Abrir Postman → **Import** → arrastrar el JSON.
2. Ejecutar **Auth → Login (demo1)**. El token JWT se guarda automáticamente en la variable `{{token}}` de la colección.
3. Todas las llamadas a `/users`, `/projects` y `/tasks` se ejecutan con el token ya configurado en la cabecera `Authorization: Bearer`.
4. Para demostrar el aislamiento por usuario, ejecutar **Auth → Login (demo2)** y volver a llamar a los endpoints: los recursos devueltos serán los del segundo usuario, no los del primero.

## Estructura del repositorio

- `api/openapi.yaml` — Especificación OpenAPI 3.0
- `doc/` — Capítulos del informe (`c1.md` a `c4.md`)
- `mysql/init.sql` — Esquema + 30 registros por tabla
- `mysql/Dockerfile` — Dockerfile de la imagen MySQL con seed
- `postman/taskmanager-api.postman_collection.json` — Colección Postman
- `src/` — Código fuente de la API (routes, controllers, middlewares, config)
- `Dockerfile` — Dockerfile de la imagen Node
- `docker-compose.yml` — Orquestación de los dos contenedores
- `.env.example` — Plantilla de variables de entorno

## Documentación

El informe completo del proyecto se encuentra en la carpeta `doc/`, dividido en cuatro capítulos:

1. **`c1.md`** — Introducción y descripción del proyecto.
2. **`c2.md`** — Arquitectura y modelo de datos.
3. **`c3.md`** — Implementación de la API.
4. **`c4.md`** — Autenticación y Autorización (incluye comparación con los flujos de OAuth 2.0).

## Variables de entorno

| Variable | Descripción | Valor por defecto en `.env.example` |
|---|---|---|
| `DB_NAME` | Nombre de la base de datos | `taskmanager` |
| `DB_PASSWORD` | Password de root de MySQL | `taskmanager_pass` |
| `JWT_SECRET` | Clave secreta para firmar los JWT | (cambiar antes de producción) |

## Notas

- Los datos de MySQL persisten en un volumen Docker llamado `mysql_data`. Para reiniciar la base de datos desde cero, ejecutar `docker compose down -v` (la `-v` borra el volumen).
- Los tokens JWT tienen una validez de 1 hora.
- El proyecto está pensado para entorno de desarrollo; en producción habría que cambiar `JWT_SECRET` y `DB_PASSWORD` por valores aleatorios fuertes, restringir CORS, y considerar la migración a OAuth 2.0 con un proveedor externo (ver `doc/c4.md` §4.6).