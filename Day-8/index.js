const express = require('express');
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    const {name,email}  = req.query;
    const {method} = req;
    res.send({method,name,email})
})

app.post("/",(req,res)=>{
    const {name,email} = req.body;
    const {method} = req;
    res.send({method,name,email});
})
app.listen(3000);