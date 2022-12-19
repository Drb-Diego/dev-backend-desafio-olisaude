import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Gender {
  male = 'male',
  female = 'female',
}

export type UserSickness = {
  name: string;
  degree: number;
};

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  userSickness?: UserSickness[];
}
