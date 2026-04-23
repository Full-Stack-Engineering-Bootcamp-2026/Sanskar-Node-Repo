import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import prductRouter from "./routes/product.route.js";
import { User } from "./modules/user.js";
import { Order } from "./modules/order.js";
import { Product } from "./modules/product.js";
import mongoose from "mongoose";
import { log } from "node:console";

const MONGODB_URI = process.env.MONGO_ATLAS_CONNECTION_URI as string;

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static("images"));

app.use("/", prductRouter);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(3000);
    console.log("MongoDB connected successfully!!!");
    console.log("server started at 3000");
  } catch (err) {
    console.log(err);
  }
};

startServer();

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
