const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venta = sequelize.define('Venta', {
  id:          { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id:  { type: DataTypes.INTEGER, allowNull: false },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad:    { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  total:       { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
}, { tableName: 'ventas' });

module.exports = Venta;
