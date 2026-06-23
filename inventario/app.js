
const express=require("express");
const sequelize=require("./config/database");
const Model=require("./models/Producto");
const app=express();

app.use(express.json());
sequelize.sync();

app.get("/productos",async(req,res)=>{
 const data=await Model.findAll();
 res.json(data);
});

app.post("/productos",async(req,res)=>{
 const data=await Model.create(req.body);
 res.json(data);
});

app.listen(3001,()=>console.log("inventario iniciado"));
