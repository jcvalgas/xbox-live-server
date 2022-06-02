import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
    @IsString()
    @ApiProperty({
        description: 'JWT gerado para login',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGdhc0BnbWFpbC5jb20iLCJpYXQiOjE2NTQxOTE5NDcsImV4cCI6MTY1NDI3ODM0N30.4gnDFJNFYt5EwmQ5GEmEmztT-fHz5zMNyOIfI18ejXI'
    })
    token: string

    @ApiProperty({
        description: 'Dados de resposta do usuário',
    })
    user: User
}