import { Service } from "typedi";
import User from "../models/user.js";
import { userDto } from "../types/userDto.js";

@Service()
export class UserRepository {
  async findAllUsers() {
    return User.find();
  }
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async createUser(data: userDto) {
    const { email, password } = data;
    const user = new User({ email, password });
    return user.save();
  }
}
