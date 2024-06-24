
# nexu-backend-test

API REST que realiza operaciones CRU en los recursos `/models` y `/brands`.

Stack:
- Node.js
- Typescript
- Express
- Postgres
- Docker

## Instrucciones para la construcción de imagen Docker y despliegue de contenedores

Requisitos:
- Tener instalado Docker y docker-compose

### Comando para ejecutar en la raíz del proyecto:

``# docker-compose up``

Nota: este comando levantará un contenedor de Postgres y ejecutará un script que creará las tablas requeridas por la aplicación.

## Instrucciones para ejecutar la aplicación en entorno local

Requisitos:
- Tener instalado Node versión mayor a 12.xx.
- Editar la variable de entorno `DB_HOST` ubicada en el archivo `.env` y asignar el valor `localhost`.

### Comando para ejecutar en la raíz del proyecto:

``# npm run dev``

Nota: este comando transpila el código en Typescript a Javascript y ejecuta el archivo `index.js` generado.

## Instrucciones para ejecutar los test unitarios

Requisitos:
- Tener instalado Node versión mayor a 12.xx.

### Comando para ejecutar en la raíz del proyecto:

``# npm run test``
