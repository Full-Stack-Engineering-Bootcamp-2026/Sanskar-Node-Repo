const express = require('express');
const app = express();

app.get("/about",(req,res,next)=>{
    res.send("<h1>This has been a great journey about learning node js and express and i got to learn many new things</h1>");
})

app.get("/contact",(req,res,next)=>{
    res.send("<h1>Sanskar Rajput</h1><h3>React + Node js</h3>");
})

app.get("/skills",(req,res,next)=>{
    res.send("<ul><li>React</li><li>Nodejs</li><li>Express</li><li>Java</li></ul>")
})
app.get("/",(req,res,next)=>{
    res.send("<h1>Welcome Page</h1>");
})

app.listen(3000);