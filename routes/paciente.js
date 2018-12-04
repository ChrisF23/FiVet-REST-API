var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Controlador = require('../controllers/controlador');

// Obtener modelo Paciente.
const Paciente = require('../models/index').Paciente;

/**
 * Muestra una lista con todos los pacientes.
 */
router.get('/', (req, res) => Controlador.listar(req, res, Paciente));

/**
 * Realiza una consulta a la tabla Paciente y retorna los resultados.
 */
router.get('/search', (req, res) => Controlador.buscarPacientes(req, res));


router.get('/:id', (req, res) => Controlador.getById(req, res, Paciente));



/**
 * Crea un Paciente
 */
router.post('/', (req, res) => Controlador.crear(req, res, Paciente));


router.put('/', (req, res) => Controlador.actualizar(req, res, Paciente))
// Exportar el router.
module.exports = router;