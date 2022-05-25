import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

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
}
