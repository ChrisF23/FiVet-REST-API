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
            res.send(pacientes);
            console.log(JSON.stringify(pacientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los pacientes...', JSON.stringify(err))
            return res.send(err)
        });
});

router.get('/:id', (req, res) => {
    return Paciente.findById(req.params.id)
        .then((pacientes) => {
            res.send(pacientes);
            console.log(JSON.stringify(paciente));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener al paciente...', JSON.stringify(err))
            return res.send(err)
        });
});

/**
 * Realiza una consulta a la tabla Paciente y retorna los resultados.
 */
router.get('/search', (req, res) => {
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

/**
 * Crea un Paciente
 */
router.post('/', (req, res) => {
    return Paciente.findOrCreate({where: req.body})
    .spread((paciente, created) => {
    console.log(paciente.get({
      plain: true
    }))
    console.log(created);
    res.send(paciente.get({plain: true}))
    })
})

router.put('/', (req, res) => {
    return Paciente.findAll({ where: { id: req.body.id } })
    .spread(function (paciente) {
        // Check if record exists in db
        if (paciente) {
            paciente.update(req.body);
            //.success(function () {res.send(paciente.get({plain: true}));})
            res.send(paciente.get({plain: true}));
        }
    }, function(err) {
        res.status(400);
        res.send(err);
        return;
    })
})


// Exportar el router.
module.exports = router;