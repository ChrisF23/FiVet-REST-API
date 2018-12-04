var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
controlador = require('../controllers/controlador');
metabuscador = require('../controllers/metabuscador');

// Obtener modelo Cliente.
const Cliente = require('../models/index').Cliente;

/**
 * Muestra una lista con todos los clientes.
 */
router.get('/', (req, res) => controlador.listar(req, res, Cliente));

router.get('/:id', (req, res) => controlador.getById(req, res, Cliente));


/**
 * Realiza una consulta a la tabla Cliente y retorna los resultados.
 */
router.get('/search', (req, res) => metabuscador.metabuscadorCliente(req, res));

/**
 * Crea un Cliente
 */
router.post('/', (req, res) => controlador.crear(req, res, Cliente));


router.put('/', (req, res) => controlador.actualizar(req, res, Cliente))
// Exportar el router.
module.exports = router;