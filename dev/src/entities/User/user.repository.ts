import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './@types';

import { PrismaService } from 'src/database';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserBody: CreateUserDTO) {
    const { name, gender, birthDate } = createUserBody;

    const userCreated = await this.prismaService.user.create({
      data: {
        name,
        gender,
        birthDate,
      },
    });

    return userCreated;
  }
}
