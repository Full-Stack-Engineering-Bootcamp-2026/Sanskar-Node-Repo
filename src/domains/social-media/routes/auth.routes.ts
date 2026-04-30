import { Router, Request, Response } from "express";
import { Service, Container } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service.js";

@Service()
export class AuthRoutes {
  public router: Router;
  private secret = process.env.JWT_SECRET || "";
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = Container.get(UserService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", this.login);
  }

  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      this.secret
    );

    return res.status(200).json({  token });
  };
}
