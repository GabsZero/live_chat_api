import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
    @IsString()
    @IsNotEmpty()
    last_name: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    nickname: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
