import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FriendStatus } from './friend-status.entity';

@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_friends',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_1_id',
    foreignKeyConstraintName: 'fk_friend_user_1_id',
  })
  user1: User;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_2_id',
    foreignKeyConstraintName: 'fk_friend_user_2_id',
  })
  user2: User;

  @ManyToOne(() => FriendStatus, (status) => status.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'status',
    foreignKeyConstraintName: 'fk_friend_status_id',
  })
  status: FriendStatus;

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
  deletedAt: Date;
}
