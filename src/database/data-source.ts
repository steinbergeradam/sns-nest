import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/database/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
