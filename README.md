# **FiVet REST API**
## Descripcion del proyecto:
...


## Estructura del proyecto:
* **config**: Los archivos de configuracion de la aplicacion.
* **routes**: Las rutas de la aplicacion.
* **models**: Los modelos de la base de datos.
* **seeders**: Los datos iniciales que se agregan a la base de datos *(DATA MANIPULATION)*.
* **migrations**: Las migraciones del esquema *(DATA DEFINITION)*.


## Instrucciones:
1) **npm install** *para instalar los modulos necesarios.*
2) **node_modules/.bin/sequelize db:migrate** *para crear las tablas.*
3) **node_modules/.bin/sequelize db:seed:all** *para poblar las tablas con datos iniciales.*
4) **nodemon** *para ejecutar la aplicacion.*