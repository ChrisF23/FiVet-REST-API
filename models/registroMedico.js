'use strict';
var cliente = require('./index').Cliente;
var paciente = require('./index').Paciente;

module.exports = (sequelize, DataTypes) => {
  const RegistroMedico = sequelize.define('RegistroMedico', {
        pacienteId: {
            type : DataTypes.STRING,
            allowNull: false
        },
        clienteId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        anamnesia : DataTypes.STRING,
        peso: DataTypes.FLOAT,
        temperatura: DataTypes.FLOAT,
        hidratacion: DataTypes.FLOAT,
        pulso: DataTypes.FLOAT,
        frecuenciaCardiaca: DataTypes.FLOAT,
        frecuenciaRespiratoria: DataTypes.FLOAT,
        mucosas: DataTypes.FLOAT,
        tiempoDeLlenadoCapilar: DataTypes.FLOAT,
        ganglios: DataTypes.STRING,
        reflejoTusigeno: DataTypes.STRING,
        reflejoDeglutorio: DataTypes.STRING,
        palpitaciónAbdominal: DataTypes.STRING,
        palmopercusion: DataTypes.STRING, condicionCorporal: DataTypes.STRING,
        tonsillas: DataTypes.STRING,
        conciencia: DataTypes.STRING,
  }, {
    //Evitar que sequelize modifique el nombre de la tabla.
    freezeTableName: true,
    //Definir nombre de la tabla.
    tableName: 'RegistroMedico',
  });
  RegistroMedico.associate = function(models) {
    // associations can be defined here
  };
  return RegistroMedico;
};