<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Un proyecto construido con Nest.js</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

Plataforma para restaurantes que permite a los clientes solicitar un mesero desde su móvil, priorizando nuevos visitantes, y notifica al personal en tiempo real. Incluye backend, frontend y app para una experiencia eficiente y conectada.

## Project setup

Necesitas contar con una base de datos llamada `quick_waiter_app` en PostgreSQL utilizando Docker Desktop y conectarla a el proyecto.

### Paso 1: Crear contenedor de PostgreSQL en Docker

Primero, necesitas tener Docker Desktop instalado. Luego, puedes crear y ejecutar un contenedor de PostgreSQL en Docker.

1. Crea un archivo `docker-compose.yml` en el directorio de proyecto para configurar el contenedor de PostgreSQL:
    ```yaml
   version: '3.8'
   services:
      postgres:
      image: postgres:latest
      container_name: postgres_container
      environment:
        POSTGRES_DB: quick_waiter_app
        POSTGRES_USER: user
        POSTGRES_PASSWORD: password
      ports:
        - "5432:5432"
      volumes:
        - postgres_data:/var/lib/postgresql/data
   volumes:
      postgres_data:
     ```
2. Ejecuta el contenedor de Docker:
   En la terminal, navega a tu directorio de proyecto y ejecuta:
    ```bash
   $ docker-compose up -d
    ```
3. Verifica que el contenedor esté corriendo:
   Puedes verificar que el contenedor de PostgreSQL esté en funcionamiento con:
    ```bash
   $ docker ps
    ```
### Paso 2: Instala las dependencias del Proyecto de Nest.js

Necesitarás instalar los paquetes necesarios del proyecto para su correcto funcionamiento ejecutando el siguiente comando:

```bash
$ npm install
```

### Paso 3: Configurar variables de entorno

Debes de contar con un archivo `.env` en la raiz del proyecto `backend` para tener una ejecucion exitosa.

A continuacion un ejemplo de lo que debe contener dicho archivo:

```yaml
# Application
PORT=8080

# Firebase
FIREBASE_CONFIG_PATH=./path/to/serviceAccountKey.json

# JWT
JWT_SECRET=you-jwt-secret

# DATABASE
DB_USER_NAME=user
DB_PASSWORD=password
DB_NAME=quick_waiter_app
DB_HOST=localhost
DB_DIALECT=postgres
```
### Paso 4: Ejecutar el proyecto

Finalmente, asegúrate de que todo esté bien configurado y ejecuta el proyecto:

```bash
$ npm run start:dev
```
Importante: Existen otras variables para su ejecucion por lo que puedes tambien referirte al archivo `package.json`

### Paso 5: Descargar coleccion de postman

[Link a la coleccion de postman en el repositorio](https://github.com/juniiormediina/quick_waiter_app/blob/master/backend/src/config/Quick_Waiter_App_API.postman_collection.json)

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

