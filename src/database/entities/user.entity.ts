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
import { Address } from './address.entity';
import { Denomination } from './denomination.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_users',
  })
  id: string;

  @Column({
    name: 'google_id',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  googleId: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  lastName?: string;

  @Column({
    name: 'picture',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  picture?: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'birthdate',
    type: 'date',
    nullable: true,
  })
  birthdate?: Date;

  @ManyToOne(() => Address, (address) => address.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: 'address_id',
    foreignKeyConstraintName: 'fk_user_address_id',
  })
  address?: Address;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: ['M', 'F'],
    nullable: true,
  })
  gender?: 'M' | 'F';

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  bio?: string;

  @ManyToOne(() => Denomination, (denomination) => denomination.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: 'denomination_id',
    foreignKeyConstraintName: 'fk_user_denomination_id',
  })
  denomination?: Denomination;

  @Column({
    name: 'statement_of_faith',
    type: 'text',
    nullable: true,
  })
  statementOfFaith?: string;

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
