import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Address } from '../database/entities/address.entity';
import { Denomination } from '../database/entities/denomination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([Denomination]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
