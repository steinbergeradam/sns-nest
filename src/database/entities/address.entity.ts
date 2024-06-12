import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_addresses',
  })
  id: string;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  street: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  city: string;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  state: string;

  @Column({
    name: 'zip',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  zip: string;

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
