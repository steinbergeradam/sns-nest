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
import { Denomination } from './denomination.entity';
import { Address } from './address.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_profiles',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_profile_user_id',
  })
  user: User;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'birthdate',
    type: 'date',
    nullable: false,
  })
  birthdate: Date;

  @ManyToOne(() => Address, (address) => address.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'address_id',
    foreignKeyConstraintName: 'fk_profile_address_id',
  })
  address: Address;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: ['M', 'F'],
    nullable: false,
  })
  gender: 'M' | 'F';

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  bio: string;

  @ManyToOne(() => Denomination, (denomination) => denomination.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'denomination_id',
    foreignKeyConstraintName: 'fk_profile_denomination_id',
  })
  denomination: Denomination;

  @Column({
    name: 'statement_of_faith',
    type: 'text',
    nullable: false,
  })
  statementOfFaith: string;

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
