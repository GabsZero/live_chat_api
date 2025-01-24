import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const result = await this.usersService.create(createUserDto);

    return response.status(result.statusCode).json(result)
  }

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.usersService.findAll();
    
    if(result.length == 0) {
      return response.status(HttpStatus.OK).json({
        message: "No users found",
        data: []
      });
    }

    return response.status(HttpStatus.OK).json({
      message: "Users fetched successfully",
      data: result
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
