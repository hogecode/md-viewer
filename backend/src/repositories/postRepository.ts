import { injectable } from 'inversify';
import { AppDataSource } from '../typeorm/typeormConfig';
import { Post } from '../models/post';

@injectable()
export class PostRepository {
  private repo = AppDataSource.getRepository(Post);

  async findByUserId(userId: string, skip = 0, take = 10): Promise<Post[]> {
    return this.repo.find({ where: { userId }, skip, take });
  }

  async save(post: Post): Promise<Post> {
    return this.repo.save(post);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findOne(id: string): Promise<Post | null> {
    return this.repo.findOneBy({ id });
  }

  async searchPostsByRank(userId: string, searchText: string): Promise<Post[]> {
    return this.repo
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .andWhere(
        `post.document_with_weights @@ plainto_tsquery('japanese', :query)`,
        { query: searchText },
      )
      .orderBy(
        `ts_rank_cd(post.document_with_weights, plainto_tsquery('japanese', :query))`,
        'DESC',
      )
      .getMany();
  }
}
