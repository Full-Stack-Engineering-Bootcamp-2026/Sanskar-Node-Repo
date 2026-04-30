import { Service } from "typedi";
import Post from "../models/post.js";
import { postCreateDto } from "../types/postDto.js";

@Service()
export class PostRepository {
  async findAll(page: number, perPage: number) {
    const skip = (page - 1) * perPage;

    return Post.find().skip(skip).limit(perPage);
  }
  async findById(id: string) {
    return Post.findById(id);
  }

  async create(data: postCreateDto) {
    const post = new Post(data);
    return post.save();
  }
  async update(id: string, data: postCreateDto) {
    return Post.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
  }
  async delete(id: string) {
    return Post.findByIdAndDelete(id);
  }
}
