var express = require('express');
var router = express.Router();
const controlador = require('../controllers/controlador');

// Obtener modelo Paciente.
const Paciente = require('../models/index').Paciente;

// Muestra una lista con todos los pacientes.
router.get('/', (req, res) => controlador.listar(req, res, Paciente));

// Realiza una consulta a la tabla Paciente y retorna los resultados.
router.get('/search', (req, res) => controlador.buscarPacientes(req, res, Paciente));

router.get('/:id', (req, res) => controlador.getById(req, res, Paciente));

// Crea un Paciente.
router.post('/', (req, res) => controlador.crear(req, res, Paciente));

// Actualiza un Paciente.
router.put('/', (req, res) => controlador.actualizar(req, res, Paciente))


// Exportar el router.
module.exports = router;