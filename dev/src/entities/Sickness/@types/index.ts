import { User } from '@prisma/client';
import { IsNotEmpty, IsObject, IsUUID } from 'class-validator';

import { UserSickness } from 'src/entities/User/@types';

export class CreateSicknessDTO {
  user: User;

  @IsNotEmpty()
  @IsObject()
  userSickness: UserSickness[];
}

export class CreateSicknessRepositoryDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsObject()
  sickness: UserSickness;
}
