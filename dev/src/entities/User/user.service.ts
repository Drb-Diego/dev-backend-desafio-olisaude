import { HttpException, Injectable } from '@nestjs/common';

import { BodyEditUserDTO, CreateUserDTO } from './@types';

import { UserRepository } from './user.repository';
import { SicknessService } from '../Sickness/sickness.service';

@Injectable()
export class UserService {
  constructor(
    private readonly sicknessService: SicknessService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserBody: CreateUserDTO) {
    const { name, gender, birthDate, userSicknesses } = createUserBody;

    const userCreated = await this.userRepository.create({
      name,
      gender,
      birthDate,
      userSicknesses,
    });

    if (userSicknesses) {
      const sicknessCreated = await this.sicknessService.create({
        user: { ...userCreated },
        userSicknesses,
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

  async findOne(userId: string) {
    const userFinded = await this.userRepository.findOne(userId);

    if (!userFinded) throw new HttpException('User not found', 404);

    const sicknessFinded = await this.sicknessService.findOne(userId);

    return { user: userFinded, userSickness: sicknessFinded };
  }

  async edit(userId: string, payload: BodyEditUserDTO) {
    const { name, gender, birthDate } = payload;

    const userEdited = await this.userRepository.edit(userId, {
      name,
      gender,
      birthDate,
    });

    return userEdited;
  }
}
