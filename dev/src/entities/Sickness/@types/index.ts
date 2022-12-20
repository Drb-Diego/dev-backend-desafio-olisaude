import { User } from '@prisma/client';
import { IsNotEmpty, IsObject, IsUUID } from 'class-validator';

import { UserSickness } from 'src/entities/User/@types';

export class CreateSicknessDTO {
  user: User;

  @IsNotEmpty()
  @IsObject()
  userSicknesses: UserSickness[];
}

export class CreateSicknessRepositoryDTO {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsObject()
  sicknesses: UserSickness;
}
