import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../database/entities/address.entity';
import { User } from '../database/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Denomination } from '../database/entities/denomination.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Denomination)
    private readonly denominationRepository: Repository<Denomination>,
  ) {}

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: dto.id } });
    if (!user) {
      throw new Error('User not found');
    }

    if (dto.denominationId) {
      const denomination = await this.denominationRepository.findOne({
        where: { id: dto.denominationId },
      });
      if (!denomination) {
        throw new Error('Denomination not found');
      }
      user.denomination = denomination;
    }

    if (dto.address) {
      const address = await this.addressRepository.findOne({
        where: { id: dto.address.id },
      });
      if (!address) {
        throw new Error('Address not found');
      }
      address.city = dto.address.city || address.city;
      address.state = dto.address.state || address.state;
      address.street = dto.address.street || address.street;
      address.zip = dto.address.zip || address.zip;
      this.addressRepository.save(address);
      user.address = address;
    }

    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.picture = dto.picture || user.picture;
    user.phoneNumber = dto.phoneNumber || user.phoneNumber;
    user.birthdate = dto.birthdate || user.birthdate;
    user.gender = dto.gender || user.gender;
    user.bio = dto.bio || user.bio;
    user.statementOfFaith = dto.statementOfFaith || user.statementOfFaith;

    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.userRepository.softRemove(user);
  }

  async restore(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });
    return await this.userRepository.recover(user);
  }
}
