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

  userSicknesses?: UserSickness[];
}

export class IdParamDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class BodyEditUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}

export class EditUserRepositoryDTO {
  name: string;
  gender: Gender;
  birthDate: Date;
}
