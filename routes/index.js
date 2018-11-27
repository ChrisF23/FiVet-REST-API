var express = require('express');
var router = express.Router();

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
router.get('/', function(req, res, next) {
  res.send(indexView);
}); 

module.exports = router;
