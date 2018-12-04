var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Obtener modelo RegistroMedico.
const RegistroMedico = require('../models/index').RegistroMedico;

/**
 * Muestra una lista con todos los registroMedicos.
 */
router.get('/', (req, res, next) => {
    return RegistroMedico.findAll()
        .then((registroMedicos) => {
            res.send(registroMedicos);
            console.log(JSON.stringify(registroMedicos));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los registroMedicos...', JSON.stringify(err))
            return res.send(err)
        });
});

/**
 * Realiza una consulta a la tabla RegistroMedico y retorna los resultados.
 */
router.get('/search', (req, res) => {
    // Obtener la consulta. 
    var query = req.body.query;
    var likeQuery = "%"+query+"%";

    console.log("RAW: " +query);
    console.log("likeQuery: " +likeQuery);

    return RegistroMedico.findAll(
        {
            
            where:
            {
                [Op.or]:
                [
                    { nombre: {[Op.like]: likeQuery} },                  
                    { apellido_paterno: {[Op.like]: likeQuery} },
                    { apellido_materno: {[Op.like]: likeQuery} },
                    { rut: {[Op.like]: likeQuery} },
                    { email: {[Op.like]: likeQuery} },
                    { telefono: {[Op.like]: likeQuery} },
                    { direccion: {[Op.like]: likeQuery} }
                ]
            }
        })
        .then((registroMedicos) => {
            if (registroMedicos.length === 0) {
                var caseEmpty = 'No se encontraron resultados que coincidan con su busqueda.';
                console.log(caseEmpty)
                return res.send(caseEmpty);
            }
            res.send(registroMedicos);
            console.log(JSON.stringify(registroMedicos));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
            return res.send(err)
        });
});

/**
 * Crea un RegistroMedico
 */
router.post('/', (req, res) => {
    return RegistroMedico.findOrCreate({where: req.body})
        .spread((registroMedico, created) => {
            console.log(registroMedico.get({
                plain: true
            }))
            console.log("mira abajo");
            if (!created) {
                res.send("RegistroMedico ya existe");
                return;
            }
            res.send(registroMedico.get({plain: true}));   
            return;
        }, 
        function(err) {
            res.status(400);
            res.send(err);
            return;
        })
})

router.put('/', (req, res) => {
    return RegistroMedico.findAll({ where: { id: req.body.id } })
    .spread(function (registroMedico) {
        // Check if record exists in db
        if (registroMedico) {
            registroMedico.update(req.body);
            //.success(function () {res.send(registroMedico.get({plain: true}));})
            res.send(registroMedico.get({plain: true}));
        }
    }, function(err) {
        res.status(400);
        res.send(err);
        return;
    })
})


// Exportar el router.
module.exports = router;