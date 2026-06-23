
const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

module.exports=sequelize.define("Venta",{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
cliente_id:DataTypes.INTEGER,
producto_id:DataTypes.INTEGER,
cantidad:DataTypes.INTEGER,
total:DataTypes.FLOAT
});
