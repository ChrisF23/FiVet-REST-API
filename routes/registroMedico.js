var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
controlador = require('../controllers/controlador');
metabuscador = require('../controllers/metabuscador');

// Obtener modelo RegistroMedico.
const RegistroMedico = require('../models/index').RegistroMedico;

/**
 * Muestra una lista con todos los registroMedicos.
 */
router.get('/', (req, res) => controlador.listar(req, res, RegistroMedico));

router.get('/:id', (req, res) => controlador.getById(req, res, RegistroMedico));


/**
 * Realiza una consulta a la tabla RegistroMedico y retorna los resultados.
 */
router.get('/search', (req, res) => metabuscador.metabuscadorRegistroMedico(req, res, true));

/**
 * Crea un RegistroMedico
 */
router.post('/', (req, res) => controlador.crear(req, res, RegistroMedico));


router.put('/', (req, res) => controlador.actualizar(req, res, RegistroMedico))
// Exportar el router.
module.exports = router;