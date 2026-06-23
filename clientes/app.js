
const express=require("express");
const sequelize=require("./config/database");
const Model=require("./models/Cliente");
const app=express();

app.use(express.json());
sequelize.sync();

app.get("/clientes",async(req,res)=>{
 const data=await Model.findAll();
 res.json(data);
});

app.post("/clientes",async(req,res)=>{
 const data=await Model.create(req.body);
 res.json(data);
});

app.listen(3002,()=>console.log("clientes iniciado"));
