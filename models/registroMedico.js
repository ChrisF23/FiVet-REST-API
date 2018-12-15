'use strict';
var cliente = require('./index').Cliente;
var paciente = require('./index').Paciente;

module.exports = (sequelize, DataTypes) => {
  const RegistroMedico = sequelize.define('RegistroMedico', {
        paciente_id: {
            type : DataTypes.STRING,
            allowNull: false
        },
        cliente_id: {
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
        frecuencia_cardiaca: DataTypes.FLOAT,
        frecuencia_respiratoria: DataTypes.FLOAT,
        mucosas: DataTypes.FLOAT,
        tiempo_de_llenado_capilar: DataTypes.FLOAT,
        ganglios: DataTypes.STRING,
        reflejo_tusigeno: DataTypes.STRING,
        reflejo_deglutorio: DataTypes.STRING,
        palpitacion_abdominal: DataTypes.STRING,
        palmopercusion: DataTypes.STRING, 
        condicion_corporal: DataTypes.STRING,
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