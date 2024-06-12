import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(@Inject() private readonly service: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    try {
      return await this.service.find();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: UpdateUserDto) {
    try {
      return await this.service.update(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('restore/:id')
  @UseGuards(JwtAuthGuard)
  async restore(@Param('id') id: string) {
    try {
      return await this.service.restore(id);
    } catch (error) {
      console.log(error);
    }
  }
}
