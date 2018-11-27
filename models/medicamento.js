'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    //Evitar que sequelize modifique el nombre de la tabla.
    freezeTableName: true,
    //Definir nombre de la tabla.
    tableName: 'Medicamento',
  });
  Medicamento.associate = function(models) {
    // associations can be defined here
  };
  return Medicamento;
};