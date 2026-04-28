import express, { Request, Response, NextFunction, Router } from 'express';
import Joi from 'joi';
import FeedController from '../controllers/feed.controller.js';
import { Service } from 'typedi';

@Service()
export default class FeedRoutes {
    public router: Router;
    private controller: FeedController
    constructor(controller: FeedController) {
        this.router = express.Router();
        this.controller = controller;
        this.initializeRoutes();
    }
    private postSchema = Joi.object({
        title: Joi.string().min(7).required(),
        imageUrl: Joi.string().min(3).required(),
        content: Joi.string().min(5).required(),
        creator: Joi.string().min(2).required()
    });

    private validatePost(req: Request, res: Response, next: NextFunction) {
        const { error } = this.postSchema.validate(req.body);
        if (error) {
            return res.status(422).json({
                message: "Validation error",
                error: error.details[0].message
            });
        }
        next();
    }

    private initializeRoutes() {
        this.router.get('/posts/:postId', this.controller.getPost.bind(this.controller));

        this.router.put("/posts/:postId", this.controller.updatePost.bind(this.controller));

        this.router.delete("/posts/:postId", this.controller.deletePost.bind(this.controller));
    }

}