'use strict';
var utils = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: {
        type : DataTypes.STRING,
        allowNull: false, 
        validate : {
            notEmpty: true
        }
    },
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
          notEmpty: true,
          esValido() {
              if (!utils.checkRut(this.rut)) {
                throw new Error('rut Invalido')
              }
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {
    //Evitar que sequelize modifique el nombre de la tabla.
    freezeTableName: true,
    //Definir nombre de la tabla.
    tableName: 'Cliente',
  });
  Cliente.associate = function(models) {
    // associations can be defined here
  };
  return Cliente;
};