import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersTable1717904147920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL`,
    );
    queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL`,
    );
    queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`,
    );
  }
}
