const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre:   { type: DataTypes.STRING(120), allowNull: false },
  empresa:  { type: DataTypes.STRING(150) },
  telefono: { type: DataTypes.STRING(20) },
  correo:   { type: DataTypes.STRING(120) },
}, { tableName: 'clientes' });

module.exports = Cliente;
