import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

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

export class FindOneDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
