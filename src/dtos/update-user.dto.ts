import { UpdateAddressDto } from './update-address.dto';

export interface UpdateUserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  phoneNumber?: string;
  birthdate?: Date;
  address?: UpdateAddressDto;
  gender?: 'M' | 'F';
  bio?: string;
  denominationId?: number;
  statementOfFaith?: string;
}
