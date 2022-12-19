import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

enum Gender {
  male = 'male',
  female = 'female',
}

type UserSickness = {
  name: string;
  degree: number;
};

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  userSickness?: UserSickness[];
}
