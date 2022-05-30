import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID } from "class-validator";

export class CreateProfileDto {

    @IsString()
    @ApiProperty({
        description: 'Nome do perfil',
        example: 'Valgas'
    })
    title: string;

    @IsUrl()
    @ApiProperty({
        description: 'Imagem do perfil',
        example: 'https://imagemperfil.com/png'
    })
    imageUrl: string;

    @IsUUID()
    @ApiProperty({
        description: 'Id do usuário do perfil',
        example: 'f0619828-a065-4502-856b-92ede4c9bb65'
    })
    userId: string;

    @IsUUID(undefined, {each: true})
    @ApiProperty({
        description: 'Lista dos IDs dos jogos favoritos do perfil',
        example: []
    })
    favoritos: string[];
}
