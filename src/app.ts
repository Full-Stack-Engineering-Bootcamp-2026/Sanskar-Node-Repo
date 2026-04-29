import express, { Request, Response,NextFunction,ErrorRequestHandler } from "express";
import path from "path";
import 'dotenv/config'
import mongoose from "mongoose";
import cors from 'cors';
import 'reflect-metadata';
import multer, { FileFilterCallback } from 'multer';
import AuthRoutes from "./routes/auth.route.js";
import {Container} from "typedi";
import FeedRoutes from "./routes/feed.route.js";
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bqfim3v.mongodb.net/?appName=Cluster0` as string;

const app = express();
const fileStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null,"images");
  },
  filename(req, file, callback) {
    callback(null,Date.now()+'-' + file.originalname)
  },
})

function fileFilter(req:Request,file:Express.Multer.File,callback:FileFilterCallback){
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    callback(null,true);
  }
  else{
    callback(null,false);
  }
}
app.use(cors());
const port = process.env.PORT;
const authRoutes = Container.get<AuthRoutes>(AuthRoutes);
const feedRoutes = Container.get<FeedRoutes>(FeedRoutes);

app.use(express.json());
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single("image"));
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

app.use('/feed', feedRoutes.router);
app.use('/auth',authRoutes.router);
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(port||3000);
    console.log("MongoDB connected successfully!!!");
    console.log("server started at 3000");
  } catch (err) {
    console.log(err);
  }
};

startServer();
