'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    rut: DataTypes.STRING,
    email: DataTypes.STRING,
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