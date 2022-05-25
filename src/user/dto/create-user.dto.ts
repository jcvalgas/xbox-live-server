import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsPositive, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João Vitor',
    })
    name: string;

    @IsEmail()
    @ApiProperty({
        description: 'Email do usuario',
        example: 'joao@gmail.com',
    })
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca',
    })
    @ApiProperty({
        description: 'Senha do usuario para login',
        example: 'Joao123@',
    })
    password: string;

    @IsString()
    @ApiProperty({
        description: 'Confirmação de senha do usuário para login',
        example: 'Joao123@',
    })
    confirmPassword: string

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'CPF do usuario',
        example: 22245674891,
    })
    cpf: number;
    
    @IsBoolean()
    @ApiProperty({
        description: 'Identifica se o usuário é um administrador ou não',
        example: true,
    })
    isAdmin: boolean;
}
