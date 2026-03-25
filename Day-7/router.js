const express = require('express');
const path = require('path')
const rootDir = require('./utils/path')
const router = express.Router();

router.get("/",(req,res)=>{
    console.log("Inside /");
    res.sendFile(path.join(rootDir,"views","home-page.html"));
})

router.get("/users",(req,res)=>{
    console.log("Inside /users");
    res.sendFile(path.join(rootDir,"views","users.html"))
})

router.get("/products",(req,res)=>{
    console.log("Inside /productss");
    res.sendFile(path.join(rootDir,"views","products.html"))
})

module.exports = router;