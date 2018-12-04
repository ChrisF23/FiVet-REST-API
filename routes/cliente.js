var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Obtener modelo Cliente.
const Cliente = require('../models/index').Cliente;

/**
 * Muestra una lista con todos los clientes.
 */
router.get('/', (req, res, next) => {
    return Cliente.findAll()
        .then((clientes) => {
            res.send(clientes);
            console.log(JSON.stringify(clientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los clientes...', JSON.stringify(err))
            return res.send(err)
        });
});

router.get('/:id', (req, res) => {
    return Cliente.findById(req.params.id)
        .then((clientes) => {
            res.send(clientes);
            console.log(JSON.stringify(clientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los clientes...', JSON.stringify(err))
            return res.send(err)
        });
});


/**
 * Realiza una consulta a la tabla Cliente y retorna los resultados.
 */
router.get('/search', (req, res) => {
    // Obtener la consulta. 
    var query = req.body.query;
    var likeQuery = "%"+query+"%";

    console.log("RAW: " +query);
    console.log("likeQuery: " +likeQuery);

    return Cliente.findAll(
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
        .then((clientes) => {
            if (clientes.length === 0) {
                var caseEmpty = 'No se encontraron resultados que coincidan con su busqueda.';
                console.log(caseEmpty)
                return res.send(caseEmpty);
            }
            res.send(clientes);
            console.log(JSON.stringify(clientes));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
            return res.send(err)
        });
});

/**
 * Crea un Cliente
 */
router.post('/', (req, res) => {
    return Cliente.findOrCreate({where: req.body})
        .spread((cliente, created) => {
            console.log(cliente.get({
                plain: true
            }))
            console.log("mira abajo");
            if (!created) {
                res.send("Cliente ya existe");
                return;
            }
            res.send(cliente.get({plain: true}));   
            return;
        }, 
        function(err) {
            res.status(400);
            res.send(err);
            return;
        })
})

// router.put('/', (req, res, next) => {
//     return Cliente.findById (req.body.id)
//         .then((clientes) => {
//             clientes.update(req.body)
//             res.send(clientes);
//             console.log(JSON.stringify(clientes));
//         })
//         .catch((err) => {
//             console.log('Ocurrio un error al obtener los clientes...', JSON.stringify(err))
//             return res.send(err)
//         });
// });

router.put('/', (req, res) => {
    return Cliente.findAll({ where: { id: req.body.id } })
    .spread(function (cliente) {
        // Check if record exists in db
        if (cliente) {
            cliente.update(req.body);
            //.success(function () {res.send(cliente.get({plain: true}));})
            res.send(cliente.get({plain: true}));
        }
    }, function(err) {
        res.status(400);
        res.send(err);
        return;
    })
})
// Exportar el router.
module.exports = router;