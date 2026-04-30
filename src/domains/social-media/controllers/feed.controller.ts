import { Request, Response } from "express";
import { Service, Container } from "typedi";
import { PostService } from "../services/post.service.js";
import Joi from "joi";


const createPostSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().required(),
});
const updatePostSchema = Joi.object({
  title: Joi.string().min(5),
  content: Joi.string(),
}).min(1);

@Service()
export class FeedController {
  private postService = Container.get(PostService);
  getPosts = async (req: Request, res: Response) => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const perPage = Math.min(50, Number(req.query.perPage) || 10);

      const posts = await this.postService.getPosts(page, perPage);

      return res.json({ posts });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };

  createPost = async (req: Request, res: Response) => {


    const { error, value } = createPostSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    try {
      const post = await this.postService.createPost({
        ...value,
        imageUrl: "images/duck.png",
        creator: { name: "indra" },
      });

      return res.status(201).json({
        message: "Post created successfully!",
        post,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };

  getPost = async (req: Request<{postId:string}>, res: Response) => {
    try {
      const {postId}  = req.params;

      if (!postId) {
        return res.status(400).json({ message: "Invalid postId" });
      }

      const post = await this.postService.getPost(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json({ post });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };

  updatePost = async (req: Request<{postId:string}>, res: Response) => {
    const { postId } = req.params;

    const { error, value } = updatePostSchema.validate(req.body);


    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    try {
      const updatedPost = await this.postService.updatePost(postId, value);

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json({
        message: "Post updated successfully!",
        post: updatedPost,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };

  deletePost = async (req: Request<{postId:string}>, res: Response) => {
    const { postId } = req.params;

    try {
      const deletedPost = await this.postService.deletePost(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.json({
        message: "Post deleted successfully!",
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}