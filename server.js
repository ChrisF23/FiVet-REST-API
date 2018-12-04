// Modulos requeridos:
const express = require('express');  
const bodyParser = require('body-parser');

// Importar Routers:
const indexRouter = require('./routes/index');
const pacienteRouter = require('./routes/paciente');
const clientesRouter = require('./routes/cliente');
const registroMedicoRouter = require('./routes/registroMedico');

// Instanciar la app.
const app = express();

// Middleware:
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Especificar Rutas:
app.use('/api/', indexRouter);
app.use('/api/pacientes', pacienteRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/registroMedico', registroMedicoRouter);

// Escuchar...
app.listen(3000, () => {  
  console.log('Ingresa a -> http://localhost:3000/');
});
