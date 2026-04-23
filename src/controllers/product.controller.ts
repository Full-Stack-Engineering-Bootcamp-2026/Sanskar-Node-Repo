import { Request,Response } from "express";
import { Product } from "../modules/product.js";



// async function getProducts (req:Request,res:Response){
    
//     const data = await Product.find()
//     res.status(200).json(data)

// }

async function getProducts(req:Request, res:Response) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (err: unknown) {
  const message = err instanceof Error ? err.message : "Unknown error";
  console.log(message);
}
}



async function postAddProduct(req: Request, res: Response) {
  try {
    const { title, price, description } = req.body;

   const imageUrl = req.file?.path;

    const product = await Product.create({
      title,
      price,
      description,
      imageUrl
    });

    res.status(201).json(product);
  } catch (err: unknown) {
  const message = err instanceof Error ? err.message : "Something went wrong";
  res.status(500).json({ error: message });
}
}

export {postAddProduct,getProducts}