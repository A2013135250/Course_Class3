
const {Sequelize}=require("sequelize");
module.exports=new Sequelize("soa_db","root","123456",{
host:"mysql",
dialect:"mysql"
});
