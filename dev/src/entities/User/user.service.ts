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
      birthDate,
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

  async findMany() {
    const usersFinded = await this.userRepository.findMany();

    const serializePromise = usersFinded.map(async (user) => {
      const sicknessFinded = await this.sicknessService.findOne(user.id);

      if (sicknessFinded.length > 0) {
        return { user, userSickness: sicknessFinded };
      }

      return { user };
    });

    const serializePromiseResolved = await Promise.all(serializePromise);

    return serializePromiseResolved;
  }
}
