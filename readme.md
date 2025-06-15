# Taller: Construyendo y Enlazando APIs

Este proyecto demuestra la construcción de una API REST utilizando Node.js y Express.js, y su consumo desde una aplicación front-end desarrollada con HTML, JavaScript y Bootstrap.

## Estructura del Proyecto

-   `backend-api/`: Contiene el código del servidor API REST (Node.js/Express.js).
-   `frontend-app/`: Contiene la aplicación cliente (HTML/JavaScript/Bootstrap) que consume la API.

## Requisitos para Ejecutar Localmente

### Backend (API REST)

1.  Navega a la carpeta `backend-api`: `cd backend-api`
2.  Instala las dependencias: `npm install`
3.  Inicia el servidor: `node server.js`
    * La API estará disponible en `http://localhost:3000`.

### Frontend (Aplicación Cliente)

1.  Navega a la carpeta `frontend-app`: `cd frontend-app`
2.  Abre `index.html` con Live Server (o simplemente en tu navegador si no necesitas el hot-reload).
    * Asegúrate de que el **backend esté corriendo** para que el frontend pueda cargar los datos.

## Evidencias de Funcionamiento del Backend

Las capturas de pantalla que demuestran el funcionamiento de la API REST localmente se encuentran en:
`frontend-app/Evidencias funcionamiento local/Evidencias funcionamiento backend local.pdf`

## Despliegue del Frontend

El frontend de esta aplicación está desplegado en GitHub Pages y se puede acceder a través de:
**https://duvanleon01.github.io/mi-proyecto-api-fullstack/**
(Nota: Para que el frontend desplegado funcione completamente, el backend debe estar corriendo localmente o desplegado en un servicio público.)