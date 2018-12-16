const Sequelize = require('sequelize');
const Buscador = require('./buscador');

module.exports = {
    listar: function (req, res, Modelo) {
        console.log("--------------------------------------------");
        console.log("[LISTAR]");    
        console.log("--------------------------------------------");
    
        return Modelo.findAll()
            .then((modelos) => {
                console.log("Se encontraron " + modelos.length + " resultados.");
                res.status(200);
                return res.send(modelos);
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener los modelos...', JSON.stringify(err))
                res.status(400);
                return res.send(err)
            });
    },

    crear: function (req, res, Modelo) {
        console.log("---------------------------------");
        console.log("[CREAR]");
        console.log("--------------------------------------------");

        return Modelo.findOrCreate({ where: req.body })
            .spread((modelo, created) => {
                console.log("Peticion: " + JSON.stringify(modelo));

                if (!created) {
                    return res.send(err);
                }
                return res.send(modelo.get({ plain: true }));
            },
                function (err) {
                    res.status(400);
                    res.send(err);
                    return;
                }).catch((err) => {
                    console.log("Error: " + err.message);
                    res.status(400);
                    return res.send(err);
                });
    },

    actualizar: function (req, res, Modelo) {
        console.log("---------------------------------");
        console.log("[ACTUALIZAR]");
        console.log("--------------------------------------------");

        return Modelo.findAll({ where: { id: req.body.id } })
            .spread((modelo) => {
                // Check if record exists in db
                //if (modelo) {
                // el Catch se deberia encargar de eso.

                modelo.update(req.body)
                    .catch(errr => {
                        console.log("Error: " + errr.message);
                        res.status(400);
                        return res.send(errr);
                    });

                //.success(function () {res.send(modelo.get({plain: true}));})
                return res.send(modelo.get({ plain: true }));
                //}
            }, function (err) {
                res.status(400);
                return res.send(err);
            }).catch((err) => {
                console.log("Error: " + err.message);
                res.status(400);
                return res.send(err);
            });
    },

    eliminar: function (req, res, Modelo) {
        console.log("---------------------------------");
        console.log("[BORRAR]");
        console.log("--------------------------------------------");

        return Modelo.destroy({
            where: {
                id: req.param('id')
            }
        }, function (err) {
            res.status(400);
            res.send(err);
            return;
        }).catch((err) => {
            console.log('Ocurrio un error: ', err.message)
            console.log("CATCH");
            return res.send(err);
        });
    },

    getById: function (req, res, Modelo) {
        console.log("---------------------------------");
        console.log("[SELECCIONAR]");
        console.log("--------------------------------------------");

        return Modelo.findById(req.params.id)
            .then((modelos) => {
                console.log(JSON.stringify(modelo));
                return res.send(modelos);
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener al modelo...', JSON.stringify(err))
                return res.send(err)
            });
    },

    metabusqueda: function (req, res) {

        return Promise.all([
            Buscador.buscarPacientes(req.body.query),
            Buscador.buscarClientes(req.body.query),
            //Buscador.buscarRegistrosMedicos(req.body.query)
            //Buscador.buscar...(req.body.query)
        ]).then(([pacientes, clientes, registrosMedicos]) => {
            res.write("Pacientes:\n" + pacientes);
            res.write("\nClientes:\n" + clientes);
            //res.write("\nRegistros Medicos:\n"+ registrosMedicos);
            //res.write("\n...:\n" + ...);
            res.end();
        }).catch((err) => { console.log("CATCH"); return res.send(err) });

    },

    buscarPacientes: function (req, res) {
        Buscador.buscarPacientes(req.body.query).then((result) => res.send(result)).catch((err) => console.log("CATCH"));
    },

    buscarClientes: function (req, res) {
        Buscador.buscarClientes(req.body.query).then((result) => res.send(result)).catch((err) => console.log("CATCH"));
    },

    buscarRegistrosMedicos: function (req, res) {
        Buscador.buscarRegistrosMedicos(req.body.query).then((result) => res.send(result)).catch((err) => console.log("CATCH"));
    }

}

