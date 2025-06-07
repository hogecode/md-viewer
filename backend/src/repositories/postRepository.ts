import { injectable } from 'inversify';
import { AppDataSource } from '../config/typeormConfig';
import { Post } from '../models/post';

@injectable()
export class PostRepository {
  async findByUserId(userId: string, skip = 0, take = 10): Promise<Post[]> {
    const repo = AppDataSource.getRepository(Post);
    return repo.find({ where: { userId }, skip, take });
  }

  async save(post: Post): Promise<Post> {
    const repo = AppDataSource.getRepository(Post);
    return repo.save(post);
  }

  async delete(id: string): Promise<void> {
    const repo = AppDataSource.getRepository(Post);
    await repo.delete(id);
  }

  async findOne(id: string): Promise<Post | null> {
    const repo = AppDataSource.getRepository(Post);
    return repo.findOneBy({ id });
  }
}
