var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Obtener modelo Paciente.
const Paciente = require('../models/index').Paciente;

/**
 * Muestra una lista con todos los pacientes.
 */
router.get('/', (req, res, next) => {
    return Paciente.findAll()
        .then((pacientes) => {
            /*
            if (pacientes.length === 0) {
                var caseEmpty = 'La lista se encuentra vacia.';
                console.log(caseEmpty)
                return res.send(caseEmpty);
            }
            */

            res.send(pacientes);
            console.log(JSON.stringify(pacientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los pacientes...', JSON.stringify(err))
            return res.send(err)
        });
});

/**
 * Realiza una consulta a la tabla Paciente y retorna los resultados.
 */
router.post('/', (req, res) => {
    // Obtener la consulta. 
    var query = req.body.query;
    var likeQuery = "%"+query+"%";

    console.log("RAW: " +query);
    console.log("likeQuery: " +likeQuery);

    return Paciente.findAll(
        {
            
            where:
            {
                [Op.or]:
                [
                    { nombre: {[Op.like]: likeQuery} },                  
                    { numero_chip: {[Op.like]: likeQuery} },
                    { especie: {[Op.like]: likeQuery} },
                    { edad_anios: {[Op.like]: likeQuery} },
                    { edad_meses: {[Op.like]: likeQuery} },
                    { raza: {[Op.like]: likeQuery} },
                    { color: {[Op.like]: likeQuery} }
                ]
            }
        })
        .then((pacientes) => {
            if (pacientes.length === 0) {
                var caseEmpty = 'No se encontraron resultados que coincidan con su busqueda.';
                console.log(caseEmpty)
                return res.send(caseEmpty);
            }
            res.send(pacientes);
            console.log(JSON.stringify(pacientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
            return res.send(err)
        });
});


// Exportar el router.
module.exports = router;