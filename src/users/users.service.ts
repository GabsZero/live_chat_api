import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  
  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.prisma.users.count({
       where: {
        email: createUserDto.email
      } 
    }) > 0;

    if(emailExists){
      return {
        message: "Email already exists",
        data: null,
        statusCode: 400
      }
    }

    let user: Prisma.UsersCreateInput
    
    user = {...createUserDto}
    await this.prisma.users.create({
      data: user
    })

    return {
      message: "User created successfully",
      data: user,
      statusCode: 201
    }
  }

  async findAll() {
    return await this.prisma.users.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
