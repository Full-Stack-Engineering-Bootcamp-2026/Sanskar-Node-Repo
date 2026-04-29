import bcrypt from 'bcrypt'
import { Service } from "typedi";
import User from '../models/user.model.js';
import { HttpError } from "../errors/HttpError.js";
import jwt from 'jsonwebtoken'

@Service()
export class AuthService {
    async signup(name: string, email: string, password: string) {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new HttpError("User already exists", 409);
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            email,
            password: hashPassword,
            name
        });
        return await user.save();
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(user)
            throw new HttpError("User Not found", 404);
        }
        const hash = user.password;
        const result = await bcrypt.compare(password, hash);
        if (!result)
            throw new HttpError("Invalid Password", 401);
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new HttpError("Secret couldn't be fetched", 500);
        const token = jwt.sign({
            userId: user._id,
            email
        },
            secret,
            {
                expiresIn:"1d"
            });
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }
}