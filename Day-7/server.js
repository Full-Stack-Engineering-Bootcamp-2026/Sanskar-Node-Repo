const express = require('express')
const router = require('./router')
const app = express();
app.use((req,res,next)=>{
    console.log({url:req.url,method:req.method});
    next();
})

app.use((req,res,next)=>{
    console.log("Welcome to express");
    next();
})

app.use(router);
app.listen(3000);

