import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject() private readonly service: UserService) {}

  @Get()
  async find() {
    return await this.service.find();
  }

  @Get(':id')
  async findOne(id: string) {
    return await this.service.findOne(id);
  }

  @Patch()
  async update(@Body() dto: UpdateUserDto) {
    return await this.service.update(dto);
  }

  @Delete(':id')
  async delete(id: string) {
    return await this.service.delete(id);
  }

  @Post('restore/:id')
  async restore(id: string) {
    return await this.service.restore(id);
  }
}
