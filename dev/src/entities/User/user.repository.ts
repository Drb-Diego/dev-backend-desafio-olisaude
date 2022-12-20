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

  async findMany() {
    const usersFinded = await this.prismaService.user.findMany();

    return usersFinded;
  }

  async findOne(userId: string) {
    const userFinded = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return userFinded;
  }
}
