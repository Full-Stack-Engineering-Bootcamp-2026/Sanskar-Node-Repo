import { Service } from 'typedi';
import Post from '../models/post.model.js'
import { ObjectId } from 'mongoose';

@Service()
export class FeedService {
    async getPosts(){
        const posts = await Post.find();
        return posts;
    }
    async createPost(title:String,imageUrl:String,content:String,creator:String){
        const post = new Post({
            title,
            imageUrl,
            content,
            creator
        });
        const result = await post.save();
        return result;
    }

    async getPostById(id:string){
        const post = await Post.findById(id);
        if(!post){
            const error = new Error("No post with that id");
            error.message = "Not found"; 
            throw error;
        }
        return post;
    }
}