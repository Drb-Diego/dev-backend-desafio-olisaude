import { Injectable } from '@nestjs/common';
import { CreateSicknessRepositoryDTO } from './@types';
import { PrismaService } from 'src/database';

@Injectable()
export class SicknessRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create({ userId, sicknesses }: CreateSicknessRepositoryDTO) {
    const sicknessCreated = await this.prismaClient.sickness.create({
      data: {
        userId,
        name: sicknesses.name,
        degree: sicknesses.degree,
      },
    });

    return sicknessCreated;
  }

  async findOne(userId: string) {
    const sicknessFinded = await this.prismaClient.sickness.findMany({
      where: { userId },
    });

    return sicknessFinded;
  }
}
