import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDTO, FindOneDTO } from './@types';

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

  @Get('findOne/:id')
  async findOne(@Param() { id: userId }: FindOneDTO) {
    const usersFinded = await this.userService.findOne(userId);

    return usersFinded;
  }
}
