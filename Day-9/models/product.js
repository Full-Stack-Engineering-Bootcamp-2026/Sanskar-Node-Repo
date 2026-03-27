const path = require("path");
const fs = require("fs")

const products = [];
module.exports = class Product{
    constructor(title){
        this.title = title;
    }
    
    // const url = path.dirname
    save(){
        
        const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            let products = []
            if(!err)
                products = JSON.parse(fileContent)
            
            products.push(this);
            console.log(products);
            
            fs.writeFile(p,JSON.stringify(products),(err)=>console.log("Error"+err)); 
            
        })
    }

    static fetchAll(callback){
        const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                callback([]);
            }
            callback(JSON.parse(fileContent))
        })
        // return products;
    }
}