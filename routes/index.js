var express = require('express');
var router = express.Router();
const Controlador = require('../controllers/controlador');

// Esto es solo por el momento:
var indexView = 
`
<html>
    <head>
        <title>Bienvenido a FiVet</title>
    </head>
    <body>
        <h1>Pagina Principal</h1>
    </body>
</html>
`

/**
 * Mostrar la pagina principal.
 */
router.get('/', (req, res) => res.send(indexView)); 

router.get('/search', (req, res) => Controlador.metabusqueda(req, res));

module.exports = router;
