var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
controlador = require('../controllers/controlador');
const buscador = require('../controllers/buscador');

// Obtener modelo Cliente.
const Cliente = require('../models/index').Cliente;

/**
 * Muestra una lista con todos los clientes.
 */
router.get('/', (req, res) => controlador.listar(req, res, Cliente));


/**
 * Realiza una consulta a la tabla Cliente y retorna los resultados.
 */
router.get('/search', (req, res) => buscador.buscarClientes(req, res));


router.get('/:id', (req, res) => controlador.getById(req, res, Cliente));


/**
 * Crea un Cliente
 */
router.post('/', (req, res) => controlador.crear(req, res, Cliente));


router.put('/', (req, res) => controlador.actualizar(req, res, Cliente))
// Exportar el router.
module.exports = router;