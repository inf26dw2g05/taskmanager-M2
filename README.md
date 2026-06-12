# TaskManager Web Application

API REST para gestión de proyectos y tareas personales, desarrollada para la asignatura **Desarrollo Web II — M2** (UMAIA, curso 2025/2026).

El proyecto reutiliza la API REST desarrollada en M1 y añade una aplicación cliente desarrollada con ReactJS para consumir los recursos ofrecidos por dicha API.

- **Grupo:** `inf25dw2g05`
- **Equipo:** Marcos Martínez Fernández (A048665), Francisco Capilla Sánchez (A048669)
- **Repositorio GitHub:** https://github.com/inf26dw2g05/taskmanager-M2
- **Docker Hub:** https://hub.docker.com/u/inf25dw2g05

## Características principales

- Frontend desarrollado con ReactJS.
- Uso de componentes React simples.
- Uso de `useState` para gestionar estado local.
- Uso de `useEffect` para cargar datos desde la API.
- Formularios controlados para login, proyectos y tareas.
- Comunicación con API REST mediante `fetch`.
- Autenticación mediante JWT.
- Almacenamiento del token en `localStorage`.
- Navegación simple entre Profile, Projects y Tasks.
- Backend REST reutilizado del trabajo M1.
- Base de datos MySQL con datos iniciales.
- Documentación OpenAPI 3.0 servida en `/docs`.
- Colección Postman para pruebas de la API.
- Despliegue multi-contenedor con Docker Compose:
  - MySQL
  - API Node.js
  - Frontend React

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | ReactJS |
| Cliente HTTP | fetch |
| Servidor aplicacional | Node.js |
| Framework backend | Express |
| Base de datos | MySQL 8.0 |
| Autenticación | JWT |
| Hash de contraseñas | bcryptjs |
| Documentación API | OpenAPI 3.0 + Swagger UI |
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

   Docker descargará las imágenes desde Docker Hub la primera vez (`inf25dw2g05/taskmanager-app`, `inf25dw2g05/taskmanager-mysql` y`inf25dw2g05/frontend`) y arrancará los tres contenedores.

4. Cuando aparezcan los mensajes `Connected to MySQL database` y `app running on localhost:3001`, la web estará lista.

### Puertos expuestos

| Servicio | Puerto host | Puerto contenedor |
|---|---|---|
| Frotend React | 3001 | 3000 |
| MySQL | 3007 | 3306 |
| API REST | 3007 | 3006 |

## Acceso a la API

### Swagger UI (documentación OpenAPI)

## API REST

La API REST desarrollada en M1 continúa disponible en:

http://localhost:3000

La documentación Swagger puede consultarse en:

http://localhost:3000/docs

### Usuarios de prueba

El seed crea 30 usuarios. Para la demo se destacan tres con credenciales conocidas:

| Email | Password |
|---|---|
| `demo1@taskmanager.com` | `demo1234` |
| `demo2@taskmanager.com` | `demo1234` |
| `demo3@taskmanager.com` | `demo1234` |

Cada uno tiene 2 proyectos asociados, con tareas dentro. El resto de usuarios (`alice`, `bob`, `carol`, etc.) usan la misma contraseña.

## Aplicación Web React

La aplicación cliente está disponible en:

```text
http://localhost:3001
```

Tras autenticarse, el usuario puede:

- Consultar su perfil.
- Gestionar proyectos (crear, editar, eliminar).
- Gestionar tareas (crear, editar, eliminar).
- Cerrar sesión.

La navegación se realiza mediante una interfaz React basada en componentes.

## Colección Postman

La colección utilizada para probar la API se encuentra en la carpeta:

postman/

## Estructura del repositorio

- `frontend/` — Aplicación React
- `frontend/src/components/` — Componentes React
- `frontend/Dockerfile` — Dockerfile del frontend
- `screenshots/` — Capturas para el informe
- `Dockerfile` — Dockerfile de la imagen Node
- `docker-compose.yml` — Orquestación de los dos contenedores

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

La aplicación cliente ha sido desarrollada utilizando ReactJS.

Componentes principales:

- `Login.js`
- `Profile.js`
- `Projects.js`
- `Tasks.js`

La comunicación con la API se realiza mediante peticiones HTTP usando `fetch`.

El token JWT devuelto por la API se almacena en `localStorage` y se envía automáticamente en las peticiones a endpoints protegidos.