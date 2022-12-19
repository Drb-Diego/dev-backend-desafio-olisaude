import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './@types';

import { UserRepository } from './user.repository';
import { SicknessService } from '../Sickness/sickness.service';

@Injectable()
export class UserService {
  constructor(
    private readonly sicknessService: SicknessService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserBody: CreateUserDTO) {
    const { name, gender, birthDate, userSickness } = createUserBody;

    const userCreated = await this.userRepository.create({
      name,
      gender,
      birthDate: new Date(birthDate),
      userSickness,
    });

    if (userSickness) {
      const sicknessCreated = await this.sicknessService.create({
        user: { ...userCreated },
        userSickness,
      });

      return {
        name: userCreated.name,
        gender: userCreated.gender,
        birthDate: userCreated.birthDate,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
        userSickness: sicknessCreated,
      };
    }

    return {
      name: userCreated.name,
      gender: userCreated.gender,
      birthDate: userCreated.birthDate,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
  }
}
