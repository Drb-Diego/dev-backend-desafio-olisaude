import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDTO } from './@types';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserBody: CreateUserDTO) {
    const { name, gender, birthDate, userSickness } = createUserBody;

    const userCreated = await this.userService.create({
      name,
      gender,
      birthDate: new Date(birthDate),
      userSickness,
    });

    return userCreated;
  }

  @Get('findMany')
  async findMany() {
    const usersFinded = await this.userService.findMany();

    return usersFinded;
  }
}
