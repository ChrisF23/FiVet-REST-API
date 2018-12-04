var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
controlador = require('../controllers/controlador');
const buscador = require('../controllers/buscador');

// Obtener modelo Paciente.
const Paciente = require('../models/index').Paciente;

/**
 * Muestra una lista con todos los pacientes.
 */
router.get('/', (req, res) => controlador.listar(req, res, Paciente));

/**
 * Realiza una consulta a la tabla Paciente y retorna los resultados.
 */
router.get('/search', (req, res) => buscador.buscarPacientes(req, res));


router.get('/:id', (req, res) => controlador.getById(req, res, Paciente));



/**
 * Crea un Paciente
 */
router.post('/', (req, res) => controlador.crear(req, res, Paciente));


router.put('/', (req, res) => controlador.actualizar(req, res, Paciente))
// Exportar el router.
module.exports = router;