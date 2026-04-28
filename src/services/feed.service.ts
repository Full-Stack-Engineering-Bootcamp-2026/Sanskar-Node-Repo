import { Service } from 'typedi';
import Post from '../models/post.model.js'
import { ObjectId } from 'mongoose';
import { HttpError } from '../errors/HttpError.js';

@Service()
export class FeedService {
    async getPosts(currentPage:number) {
        const totalPosts = await Post.find().countDocuments();
        return await Post.find().skip((currentPage - 1)*2).limit(2);
    }
    async createPost(title: string, imageUrl: string, content: string, creator: string) {
        const post = new Post({
            title,
            imageUrl,
            content,
            creator
        });
        const result = await post.save();
        return result;
    }

    async getPostById(id: string) {
        const post = await Post.findById(id);
        if (!post)
            throw new HttpError("No post with that id", 404);
        return post;
    }

    async updatePost(id: string, title: string, imageUrl: string, content: string, creator: string) {
        const post = await Post.findById(id);
        if (!post)
            throw new HttpError("No post with that id", 404);
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        post.creator = creator;
        return await post.save();
    }

    async deletePost(id:string){
        const post = await Post.findById(id);
        if(!post)
            throw new HttpError("No post with tha id",404);
        return await post.deleteOne();
    }
}