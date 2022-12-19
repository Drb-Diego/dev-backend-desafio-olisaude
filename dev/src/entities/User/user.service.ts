import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './@types';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserBody: CreateUserDTO) {
    const { name, gender, birthDate, userSickness } = createUserBody;

    const userCreated = await this.userRepository.create({
      name,
      gender,
      birthDate: new Date(birthDate),
      userSickness,
    });

    return {
      name: userCreated.name,
      gender: userCreated.gender,
      birthDate: userCreated.birthDate,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
  }
}
