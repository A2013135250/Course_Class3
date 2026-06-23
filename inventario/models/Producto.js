
const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

module.exports=sequelize.define("Producto",{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
nombre:DataTypes.STRING,
tipo:DataTypes.STRING,
precio:DataTypes.FLOAT,
stock:DataTypes.INTEGER
});
