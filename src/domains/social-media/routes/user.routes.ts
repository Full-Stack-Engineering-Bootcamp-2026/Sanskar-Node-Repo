import { Router } from "express";
import { Service, Container } from "typedi";
import { UserController } from "../controllers/user.controller.js";

@Service()
export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = Container.get(UserController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/all",
      this.userController.getAllUser.bind(this.userController),
    );
      this.router.post(
      "/email",
      this.userController.getUserByEmail.bind(this.userController),
    );
    this.router.post(
      "/create",
      this.userController.createUser.bind(this.userController),
    );
  }
}
