import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { BodyEditUserDTO, CreateUserDTO, IdParamDTO } from './@types';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserBody: CreateUserDTO) {
    const { name, gender, birthDate, userSicknesses } = createUserBody;

    const userCreated = await this.userService.create({
      name,
      gender,
      birthDate: new Date(birthDate),
      userSicknesses,
    });

    return userCreated;
  }

  @Get('findMany')
  async findMany() {
    const usersFinded = await this.userService.findMany();

    return usersFinded;
  }

  @Get('findOne/:id')
  async findOne(@Param() { id: userId }: IdParamDTO) {
    const usersFinded = await this.userService.findOne(userId);

    return usersFinded;
  }

  @Put('edit/:id')
  async edit(
    @Param() { id: userId }: IdParamDTO,
    @Body() body: BodyEditUserDTO,
  ) {
    const { name, gender, birthDate } = body;

    const userEdited = await this.userService.edit(userId, {
      name,
      gender,
      birthDate: new Date(birthDate),
    });

    return userEdited;
  }
}
