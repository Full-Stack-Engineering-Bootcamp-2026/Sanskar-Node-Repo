import { Router } from "express";
import { Service, Container } from "typedi";
import { FeedController } from "../controllers/feed.controller.js";

@Service()
export class FeedRoutes {
  public router: Router;
  private feedController: FeedController;

  constructor() {
    this.router = Router();
    this.feedController = Container.get(FeedController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
  this.router.get("/posts", this.feedController.getPosts.bind(this.feedController));

  this.router.post("/post", this.feedController.createPost.bind(this.feedController));

  this.router.get("/posts/:postId", this.feedController.getPost.bind(this.feedController));

  this.router.put("/posts/:postId", this.feedController.updatePost.bind(this.feedController));

  this.router.delete("/posts/:postId", this.feedController.deletePost.bind(this.feedController));
}
}