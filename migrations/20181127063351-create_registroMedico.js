'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegistroMedico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        paciente_id: {
          type : Sequelize.STRING,
          allowNull: false
      },
      cliente_id: {
          type: Sequelize.STRING,
          allowNull: false
      },
      fecha: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      anamnesia : Sequelize.STRING,
      peso: Sequelize.FLOAT,
      temperatura: Sequelize.FLOAT,
      hidratacion: Sequelize.FLOAT,
      pulso: Sequelize.FLOAT,
      frecuencia_cardiaca: Sequelize.FLOAT,
      frecuencia_respiratoria: Sequelize.FLOAT,
      mucosas: Sequelize.FLOAT,
      tiempo_de_llenado_capilar: Sequelize.FLOAT,
      ganglios: Sequelize.STRING,
      reflejo_tusigeno: Sequelize.STRING,
      reflejo_deglutorio: Sequelize.STRING,
      palpitacion_abdominal: Sequelize.STRING,
      palmopercusion: Sequelize.STRING,
      condicion_corporal: Sequelize.STRING,
      tonsillas: Sequelize.STRING,
      conciencia: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegistroMedico');
  }
};