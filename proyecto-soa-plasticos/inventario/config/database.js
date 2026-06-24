const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME     || 'db_inventario',
  process.env.DB_USER     || 'soa_user',
  process.env.DB_PASSWORD || 'soa_password',
  {
    host:    process.env.DB_HOST || 'mysql',
    dialect: 'mysql',
    port:    process.env.DB_PORT || 3306,
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

module.exports = sequelize;
