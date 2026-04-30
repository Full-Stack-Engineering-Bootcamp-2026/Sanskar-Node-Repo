import { Request, Response } from "express";
import { Service, Container } from "typedi";
import { UserService } from "../services/user.service.js";
import bcrypt from "bcrypt";
import { userDto } from "../types/userDto.js";

@Service()
export class UserController {
  private userService = Container.get(UserService);

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUser();
      return res.json({ users });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.json({ data: "email not exist!!!" });
      }
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const userHashed: userDto = { email, password: hashPassword };
      const user = await this.userService.createUser(userHashed);
      return res.json({ message: "user created successfully...", data: user });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}
