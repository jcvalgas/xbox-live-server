import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email do usuário para login',
        example: 'joao@gmail.com'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do usuário para login',
        example: 'Joao@123'
    })
    password: string;
}