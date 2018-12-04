const Sequelize = require('sequelize');
const Buscador = require('./buscador');

module.exports = {
    listar: function (req, res, Modelo) {
        return Modelo.findAll()
            .then((modelos) => {
                res.send(modelos);
                console.log(JSON.stringify(modelos));
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener los modelos...', JSON.stringify(err))
                return res.send(err)
            });
    },

    crear: function (req, res) {
        return Modelo.findOrCreate({ where: req.body })
            .spread((modelo, created) => {
                console.log(modelo.get({
                    plain: true
                }))
                console.log("mira abajo");
                if (!created) {
                    res.send("Modelo ya existe");
                    return;
                }
                res.send(modelo.get({ plain: true }));
                return;
            },
                function (err) {
                    res.status(400);
                    res.send(err);
                    return;
                })
    },

    actualizar: function (req, res, Modelo) {
        return Modelo.findAll({ where: { id: req.body.id } })
            .spread(function (modelo) {
                // Check if record exists in db
                if (modelo) {
                    modelo.update(req.body);
                    //.success(function () {res.send(modelo.get({plain: true}));})
                    res.send(modelo.get({ plain: true }));
                }
            }, function (err) {
                res.status(400);
                res.send(err);
                return;
            })
    },

    getById: function (req, res, Modelo) {
        return Modelo.findById(req.params.id)
            .then((modelos) => {
                res.send(modelos);
                console.log(JSON.stringify(modelo));
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
        });
        
    },

    buscarPacientes: function (req, res) {
        Buscador.buscarPacientes(req.body.query).then((result) => res.send(result));
    },

    buscarClientes: function (req, res) {
        Buscador.buscarClientes(req.body.query).then((result) => res.send(result));
    },

    buscarRegistrosMedicos: function (req, res) {
        Buscador.buscarRegistrosMedicos(req.body.query).then((result) => res.send(result));
    }

}

