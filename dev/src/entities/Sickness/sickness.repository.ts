import { Injectable } from '@nestjs/common';
import { CreateSicknessRepositoryDTO } from './@types';
import { PrismaService } from 'src/database';

@Injectable()
export class SicknessRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create({ id, sickness }: CreateSicknessRepositoryDTO) {
    const sicknessCreated = await this.prismaClient.sickness.create({
      data: {
        userId: id,
        name: sickness.name,
        degree: sickness.degree,
      },
    });

    return sicknessCreated;
  }
}
