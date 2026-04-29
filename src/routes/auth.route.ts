import express, { NextFunction, Request, Response, Router } from 'express'
import Joi from 'joi';
import AuthController from '../controllers/auth.controller.js';
import { Service } from 'typedi';

@Service()
export default class AuthRoutes {
    public router: Router;
    public controller: AuthController;
    constructor(controller: AuthController) {
        this.router = express.Router();
        this.controller = controller;
        this.initializeRoutes();
    }
    private userSchema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    private validateUser(req: Request, res: Response, next: NextFunction) {
        const { error } = this.userSchema.validate(req.body);
        if (error) {
            return res.status(422).json({
                message: "Validation error",
                error: error.details[0].message
            });
        }
        next();
    }
    private initializeRoutes() {
        this.router.post("/signup", this.controller.signup.bind(this.controller));
        this.router.post("/login", this.controller.login.bind(this.controller));
    }

}