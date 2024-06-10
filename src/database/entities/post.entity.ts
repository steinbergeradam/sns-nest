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

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_posts',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'author_id',
    foreignKeyConstraintName: 'fk_post_author_id',
  })
  author: User;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'recipient_id',
    foreignKeyConstraintName: 'fk_post_recipient_id',
  })
  recipient: User;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    name: 'media',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  media?: string;

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
