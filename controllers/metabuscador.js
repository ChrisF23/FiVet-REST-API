var express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RegistroMedico = require('../models/index').RegistroMedico;
const Cliente = require('../models/index').Cliente;
const Paciente = require('../models/index').Paciente;


module.exports = {
    
    metabuscadorPaciente: function(req, res, willSend) {
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
    },

    metabuscadorCliente: function(req, res) {
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
            .then((cliente) => {
                if (cliente.length === 0) {
                    var caseEmpty = 'No se encontraron resultados que coincidan con su busqueda.';
                    console.log(caseEmpty)
                    return res.send(caseEmpty);
                }
                res.send(cliente);
                console.log(JSON.stringify(cliente));
            })
            .catch((err) => {
                console.log('Ocurrio un error al obtener los resultados...', JSON.stringify(err))
                return res.send(err)
            });
    }
}