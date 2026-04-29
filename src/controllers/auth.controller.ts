import { Container, Service } from "typedi";
import { AuthService } from "../services/auth.service.js";
import { NextFunction, Request, Response } from "express";

@Service()
export default class AuthController {
    private authService = Container.get(AuthService);
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const result = await this.authService.signup(name, email, password);
            res.status(201).json({
                message: "Signup successfull",
                result
            })
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(new Error("Unknown error occurred"));
            }
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            if (result)
                res.status(200).json({
                    message: "Login successfull",
                    ...result
                })
            else
                res.status(401).json({
                    message: "Invalid Password"
                })
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(new Error("Unknown error occurred"));
            }
        }
    }
}