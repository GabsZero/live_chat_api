import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, PrismaClient, UserContacts } from '@prisma/client';
import { FileLogger } from './../app/FIleLogger';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaClient;
  private readonly logger: FileLogger = new FileLogger(UsersService.name, { timestamp: true });
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
      this.logger.error(`Email already exists: ${createUserDto.email}`, new Error("Email already exists").stack);
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: id
      }
    })

    if(!user) {
      this.logger.error(`User not found: ${id}`, new Error("User not found").stack);
      return {
        message: "User not found",
        data: null,
        statusCode: 404
      }
    }

    let updateUser: Prisma.UsersUpdateInput
    updateUser = {
      id: id,
      first_name: updateUserDto.first_name,
      last_name: updateUserDto.last_name,
      email: updateUserDto.email,
      nickname: updateUserDto.nickname,
    }

    const result = await this.prisma.users.update({
      where: {
        id: id
      },
      data: updateUser
    })

    if(updateUserDto.contacts && result) {
      updateUserDto.contacts.forEach( async (contact) => {
        const exists = await this.prisma.userContacts.findFirst({
          where: {
            AND: [
              { user_id: id },
              { contact_id: contact.contact_id }
            ],
          }
        })
        
        if(!exists) {
          await this.prisma.userContacts.create({
            data: {
              user_id: id,
              contact_id: contact.contact_id
            }
          })
        }
      })
    }
    return {
      message: "User updated successfully",
      data: updateUser,
      statusCode: 200
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
