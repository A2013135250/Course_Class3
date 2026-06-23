
const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

module.exports=sequelize.define("Cliente",{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
nombre:DataTypes.STRING,
empresa:DataTypes.STRING,
telefono:DataTypes.STRING,
correo:DataTypes.STRING
});
