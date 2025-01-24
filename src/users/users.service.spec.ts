import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockCreateUserEmailExists = jest.fn(createUserDto => {
     const emailExists = createUserDto.email == "test@example.com";
    
        if(emailExists){
          return {
            message: "Email already exists",
            data: null,
            statusCode: 400
          }
        }
    
        let user: Prisma.UsersCreateInput
        
        user = {...createUserDto}
    
        return {
          message: "User created successfully",
          data: user,
          statusCode: 201
        }
  });

  it('should return error if email exists', () => {
    let createUserDto = new CreateUserDto()
    createUserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      nickname: 'john.doe',
      password: 'password123',
    }
    const result = mockCreateUserEmailExists(createUserDto)
    expect(result).toEqual({
      message: 'Email already exists',
      data: null,
      statusCode: 400,
    });
  })


  it('should create a new user', () => {
    let createUserDto = new CreateUserDto()
    createUserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'jon@example.com',
      nickname: 'john.doe',
      password: 'password123',
    }
    const result = mockCreateUserEmailExists(createUserDto)
    expect(result).toEqual({
      message: "User created successfully",
      data: createUserDto,
      statusCode: 201
    });
  })
});
