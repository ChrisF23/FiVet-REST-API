const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Models = require('../models/index');

module.exports = {

    buscarPacientes: function (query) {
        // Obtener la consulta.
        var likeQuery = "%" + query + "%";

        console.log("RAW: " + query);
        console.log("likeQuery: " + likeQuery);

        return Models.Paciente.findAll(
            {
                where:
                {
                    [Op.or]:
                        [
                            { nombre: { [Op.like]: likeQuery } },
                            { numero_chip: { [Op.like]: likeQuery } },
                            { especie: { [Op.like]: likeQuery } },
                            { edad_anios: { [Op.like]: likeQuery } },
                            { edad_meses: { [Op.like]: likeQuery } },
                            { raza: { [Op.like]: likeQuery } },
                            { color: { [Op.like]: likeQuery } }
                        ]
                }
            })
            .then((pacientes) => {
                if (pacientes.length === 0) {
                    var caseEmpty = 'No se encontraron resultados que coincidan con su busqueda.';
                    console.log(caseEmpty)
                    //return res.send(caseEmpty);
                    return 'No se encontraron resultados que coincidan con su busqueda.';
                }
                //res.send(pacientes);
                console.log(JSON.stringify(pacientes));
                return JSON.stringify(pacientes);
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
                //return res.send(err)
                return JSON.stringify(err);
            });
    },

    buscarClientes: function (query) {
        var likeQuery = "%" + query + "%";

        console.log("RAW: " + query);
        console.log("likeQuery: " + likeQuery);

        return Models.Cliente.findAll(
            {

                where:
                {
                    [Op.or]:
                        [
                            { nombre: { [Op.like]: likeQuery } },
                            { apellido_paterno: { [Op.like]: likeQuery } },
                            { apellido_materno: { [Op.like]: likeQuery } },
                            { rut: { [Op.like]: likeQuery } },
                            { email: { [Op.like]: likeQuery } },
                            { telefono: { [Op.like]: likeQuery } },
                            { direccion: { [Op.like]: likeQuery } }
                        ]
                }
            })
            .then((cliente) => {
                if (cliente.length === 0) {
                    return 'No se encontraron resultados que coincidan con su busqueda.';
                }
                console.log(JSON.stringify(cliente));
                return JSON.stringify(cliente);
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
                return JSON.stringify(err);
            });


    },
    buscarRegistrosMedicos: function (query) {
        var likeQuery = "%" + query + "%";

        console.log("RAW: " + query);
        console.log("likeQuery: " + likeQuery);

        return Models.RegistroMedico.findAll(
            {
                //TODO.
            })
            .then((registroMedicos) => {
                if (registroMedicos.length === 0) {
                    return 'No se encontraron resultados que coincidan con su busqueda.'
                }
                return JSON.stringify(registroMedicos);
            })
            .catch((err) => {
                return JSON.stringify(err);
            });
    }
}