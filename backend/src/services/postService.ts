import { injectable, inject } from 'inversify';
import { PostRepository } from '../repositories/postRepository';
import { Post } from '../models/post';

@injectable()
export class PostService {
  constructor(@inject(PostRepository) private postRepo: PostRepository) {}

  async getPosts(userId: string, page = 1, pageSize = 10): Promise<Post[]> {
    const skip = (page - 1) * pageSize;
    return this.postRepo.findByUserId(userId, skip, pageSize);
  }

  async createPost(post: Post): Promise<Post> {
    return this.postRepo.save(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepo.delete(id);
  }
}
