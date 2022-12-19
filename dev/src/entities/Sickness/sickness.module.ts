import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database';
import { SicknessService } from './sickness.service';
import { SicknessRepository } from './sickness.repository';

@Module({
  providers: [PrismaService, SicknessService, SicknessRepository],
  exports: [SicknessService],
})
export class SicknessModule {}
