import { Service,Container } from "typedi";
import { PostRepository } from '../repository/post.repository.js';
import { postCreateDto } from "../types/postDto.js";

@Service()
export class PostService {
    private postRepository = Container.get(PostRepository);
  getPosts(page: number, perPage: number) {
  return this.postRepository.findAll(page, perPage);
}

  getPost(id:string) {
    return this.postRepository.findById(id)
  }

  createPost(data: any) {
    return this.postRepository.create(data);
  }
  updatePost(id: string, data: postCreateDto) {
  return this.postRepository.update(id, data);
  } 
  deletePost(id: string) {
    return this.postRepository.delete(id);
  }
}