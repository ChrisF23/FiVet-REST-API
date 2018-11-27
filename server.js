// Modulos requeridos:
const express = require('express');  
const bodyParser = require('body-parser');

// Importar Routers:
const indexRouter = require('./routes/index');
const pacienteRouter = require('./routes/paciente');

// Instanciar la app.
const app = express();

// Middleware:
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Especificar Rutas:
app.use('/', indexRouter);
app.use('/api/pacientes', pacienteRouter);

// Escuchar...
app.listen(3000, () => {  
  console.log('Ingresa a -> http://localhost:3000/');
});
