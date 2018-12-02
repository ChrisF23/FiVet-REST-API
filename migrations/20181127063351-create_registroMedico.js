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
        pacienteId: {
          type : Sequelize.STRING,
          allowNull: false
      },
      clienteId: {
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
      frecuenciaCardiaca: Sequelize.FLOAT,
      frecuenciaRespiratoria: Sequelize.FLOAT,
      mucosas: Sequelize.FLOAT,
      tiempoDeLlenadoCapilar: Sequelize.FLOAT,
      ganglios: Sequelize.STRING,
      reflejoTusigeno: Sequelize.STRING,
      reflejoDeglutorio: Sequelize.STRING,
      palpitaciónAbdominal: Sequelize.STRING,
      palmopercusion: Sequelize.STRING, condicionCorporal: Sequelize.STRING,
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