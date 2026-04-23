import express, { Request, Response } from "express";
// import {multer }from 'multer';
import path from "path";

import { User } from "./modules/user.js";
import { Order } from "./modules/order.js";
import { Product } from "./modules/product.js";
import mongoose from "mongoose";
import { log } from "node:console";
import razorpayRouter from './routes/razor-pay.route.js'

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bqfim3v.mongodb.net/?appName=Cluster0` as string;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static("images"));

app.use('/payment',razorpayRouter)



const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(port);
    console.log("MongoDB connected successfully!!!");
    console.log("server started at 3000");
  } catch (err) {
    console.log(err);
  }
};

startServer();
