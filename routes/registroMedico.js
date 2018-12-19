var express = require('express');
var router = express.Router();
controlador = require('../controllers/controlador');
const buscador = require('../controllers/buscador');

// Obtener modelo RegistroMedico.
const RegistroMedico = require('../models/index').RegistroMedico;

// Muestra una lista con todos los registroMedicos.
router.get('/', (req, res) => controlador.listar(req, res, RegistroMedico));

// Realiza una consulta a la tabla RegistroMedico y retorna los resultados.
router.get('/search', (req, res) => buscador.buscarRegistrosMedicos(req, res));

router.get('/contar', (req, res) => controlador.contar(req,res, RegistroMedico))

router.get('/:id', (req, res) => controlador.getById(req, res, RegistroMedico));

// Crea un Registro medico.
router.post('/', (req, res) => controlador.crear(req, res, RegistroMedico));

// Elimina un Registro medico.
router.delete('/:id', (req, res) => controlador.eliminar(req, res, RegistroMedico));

// Actualiza un Registro medico.
router.put('/', (req, res) => controlador.actualizar(req, res, RegistroMedico))


// Exportar el router.
module.exports = router;