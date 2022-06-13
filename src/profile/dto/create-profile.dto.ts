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

    @IsUUID(undefined, {each: true})
    @ApiProperty({
        description: 'Lista dos IDs dos jogos favoritos do perfil',
        example: []
    })
    favoritos: string[];
}
