import { Injectable } from '@nestjs/common';

import { SicknessRepository } from './sickness.repository';
import { CreateSicknessDTO } from './@types';

@Injectable()
export class SicknessService {
  constructor(private readonly sicknessRepository: SicknessRepository) {}
  async create({ user: { id }, userSickness }: CreateSicknessDTO) {
    const sicknessPromise = userSickness.map(async (sickness) => {
      const sicknessCreated = await this.sicknessRepository.create({
        id,
        sickness,
      });

      return { name: sicknessCreated.name, degree: sicknessCreated.degree };
    });

    const sicknessPromiseResolved = await Promise.all(sicknessPromise);

    return sicknessPromiseResolved;
  }
}
