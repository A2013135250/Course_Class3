
const express=require("express");
const sequelize=require("./config/database");
const Model=require("./models/Venta");
const app=express();

app.use(express.json());
sequelize.sync();

app.get("/ventas",async(req,res)=>{
 const data=await Model.findAll();
 res.json(data);
});

app.post("/ventas",async(req,res)=>{
 const data=await Model.create(req.body);
 res.json(data);
});

app.listen(3003,()=>console.log("ventas iniciado"));
