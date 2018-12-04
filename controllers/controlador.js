var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RegistroMedico = require('../models/index').RegistroMedico;
const Cliente = require('../models/index').Cliente;
const Paciente = require('../models/index').Paciente;


module.exports = {
    listar: function(req, res, Modelo) {
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

    crear: function(req, res) {
        return Modelo.findOrCreate({where: req.body})
        .spread((modelo, created) => {
            console.log(modelo.get({
                plain: true
            }))
            console.log("mira abajo");
            if (!created) {
                res.send("Modelo ya existe");
                return;
            }
            res.send(modelo.get({plain: true}));   
            return;
        }, 
        function(err) {
            res.status(400);
            res.send(err);
            return;
        })
    },

    actualizar: function(req, res, Modelo) {
        return Modelo.findAll({ where: { id: req.body.id } })
        .spread(function (modelo) {
            // Check if record exists in db
            if (modelo) {
                modelo.update(req.body);
                //.success(function () {res.send(modelo.get({plain: true}));})
                res.send(modelo.get({plain: true}));
            }
        }, function(err) {
            res.status(400);
            res.send(err);
            return;
        })
    },

    getById: function(req, res, Modelo) {
        return Modelo.findById(req.params.id)
        .then((modelos) => {
            res.send(modelos);
            console.log(JSON.stringify(modelo));
        })
        .catch((err) => {
            console.log('Ocurrio un error al obtener al modelo...', JSON.stringify(err))
            return res.send(err)
        });
    }
}

