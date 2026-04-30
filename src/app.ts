import express, { Application as ExpressApp } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Container } from "typedi";
import { FeedRoutes } from "./domains/social-media/routes/feed.routes.js";
import "reflect-metadata";
import { UserRoutes } from "./domains/social-media/routes/user.routes.js";
import { AuthRoutes } from "./domains/social-media/routes/auth.routes.js";


dotenv.config();

class Application {
  public app: ExpressApp;
  private port: number;
  private mongoUri: string;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bqfim3v.mongodb.net/?appName=Cluster0`;
    console.log(this.mongoUri);
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    const feedRoutes = Container.get(FeedRoutes);
    const userRoutes = Container.get(UserRoutes);
    const authRoutes = Container.get(AuthRoutes);

    this.app.use("/feed", feedRoutes.router);
    this.app.use("/user", userRoutes.router);
    this.app.use("/auth", authRoutes.router);
  }

  private async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
      
      console.error("MongoDB connection failed");
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    await this.connectDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }
}

const application = new Application();
application.start();

export default application.app;