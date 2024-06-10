import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_comments',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'author_id',
    foreignKeyConstraintName: 'fk_comment_author_id',
  })
  author: User;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'post_id',
    foreignKeyConstraintName: 'fk_comment_post_id',
  })
  post: Post;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
