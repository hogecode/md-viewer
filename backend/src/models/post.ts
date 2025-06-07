import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;  // 非null断言で「必ず後で値は入る」と明示

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

    // ts_vector は全文検索用（PostgreSQL 専用）
  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  @Index({ spatial: true }) // GINインデックスは手動で作成
  documentWithWeights?: string;
}

