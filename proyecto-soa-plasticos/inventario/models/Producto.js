const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id:     { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  tipo:   { type: DataTypes.STRING(80),  allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
  stock:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'productos' });

module.exports = Producto;
