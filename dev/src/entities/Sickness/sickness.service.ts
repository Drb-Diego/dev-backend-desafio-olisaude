import { HttpException, Injectable } from '@nestjs/common';

import { SicknessRepository } from './sickness.repository';
import { CreateSicknessDTO } from './@types';

@Injectable()
export class SicknessService {
  constructor(private readonly sicknessRepository: SicknessRepository) {}

  async create({ user: { id }, userSicknesses }: CreateSicknessDTO) {
    const sicknessPromise = userSicknesses.map(async (sickness) => {
      const sicknessCreated = await this.sicknessRepository.create({
        userId: id,
        sicknesses: sickness,
      });

      return { name: sicknessCreated.name, degree: sicknessCreated.degree };
    });

    const sicknessPromiseResolved = await Promise.all(sicknessPromise);

    return sicknessPromiseResolved;
  }

  async findOne(userId: string) {
    const sicknessFinded = await this.sicknessRepository.findOne(userId);

    if (!sicknessFinded) throw new HttpException('Sickness not found', 404);

    return sicknessFinded;
  }
}
