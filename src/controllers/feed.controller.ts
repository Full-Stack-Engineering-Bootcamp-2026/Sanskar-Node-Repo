import { Container, Service } from "typedi";
import { FeedService } from "../services/feed.service.js";
import 'reflect-metadata';
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { postParams } from "../types/postParams.js";

@Service()
class FeedController {
    private feedService = Container.get(FeedService)
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            let currentPage = 1;
            if (typeof req.query.page === "string")
                currentPage = parseInt(req.query.page);
            const posts = await this.feedService.getPosts(currentPage);
            if (posts.length === 0) {
                res.status(404).json({
                    message: "No posts available"
                })
            }
            else {
                res.status(200).json({
                    message: "Fetched posts successfully",
                    posts
                })
            }

        }
        catch (err: unknown) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(new Error("Unknown error occurred"));
            }
        }
    }
    async getPost(req: Request<postParams>, res: Response, next: NextFunction) {
        try {
            const id = req.params.postId;
            const post = await this.feedService.getPostById(id);
            res.status(200).json({
                message: "Fetched post successfully",
                post
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(new Error("Unknown error occurred"));
            }
        }
    }

    async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, imageUrl, content, creator } = req.body;
            const post = await this.feedService.createPost(title, imageUrl, content, creator);
            res.status(201).json({
                message: "Post created",
                post
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

    async updatePost(req: Request<postParams>, res: Response, next: NextFunction) {
        try {
            const id = req.params.postId;
            const { title, imageUrl, content, creator } = req.body;
            const result = await this.feedService.updatePost(id, title, imageUrl, content, creator);
            res.status(200).json({
                message: "Post update successfully"
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

    async deletePost(req: Request<postParams>, res: Response, next: NextFunction) {
        try {
            const id = req.params.postId;
            const result = await this.feedService.deletePost(id);
            res.status(200).json({
                message: "Post deleted successfully",
                result
            })
        }
        catch (err) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(new Error("Unknown error occurred"));
            }
        }
    }
}

export default FeedController;