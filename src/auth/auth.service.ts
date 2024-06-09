import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(profile: any): Promise<any> {
    let user = await this.userRepository.findOne({
      where: { email: profile.email },
    });
    if (!user) {
      const profileUser = {
        googleId: profile.googleId,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture,
      } as User;
      const createdUsers = this.userRepository.create(profileUser);
      await this.userRepository.save(createdUsers);
    }
    return user;
  }

  async validateUserById(googleId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { googleId: googleId },
    });
    return {
      googleId: user.googleId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
  }
}
