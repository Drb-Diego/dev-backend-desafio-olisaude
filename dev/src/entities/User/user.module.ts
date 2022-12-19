import { Module } from '@nestjs/common';

import { PrismaService } from '../../database';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SicknessModule } from '../Sickness/sickness.module';

@Module({
  imports: [SicknessModule],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
