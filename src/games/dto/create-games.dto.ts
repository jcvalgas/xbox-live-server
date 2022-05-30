import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateGamesDto {
    @IsString()
    @ApiProperty({
        description: 'Titulo do jogo',
        example: 'The Elder Scrolls V: Skyrim',
    })
    title: string;

    @IsUrl()
    @ApiProperty({
        description: 'Imagem da capa do jogo',
        example: 'https://imagemskyrim.png.com',
    })
    coverImageUrl: string;

    @IsString()
    @ApiProperty({
        description: 'Descrição do jogo',
        example: 'Skyrim é um RPG de mundo aberto repleto de ação e aventura',
    })
    description: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Ano de lançamento do jogo',
        example: 2011,
    })
    year: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Pontuação no IMDB',
        example: 5,
    })
    imdbScore: number;

    @IsUrl()
    @ApiProperty({
        description: 'Trailer do jogo no Youtube',
        example: 'https://youtube.com/skyrim'
    })
    trailerYoutubeUrl: string;

    @IsUrl()
    @ApiProperty({
        description: 'Gameplay do jogo no Youtbe',
        example: 'https://youtube.com/skyrim',
    })
    gameplayYoutubeUrl: string;

    @IsUUID(undefined, {each: true})
    @ApiProperty({
        description: 'Lista de IDs dos gêneros para o jogo',
        example: ['d88ab123-4d48-40ba-96ad-d36d89ec88ce', 'faea446c-574a-44c9-b140-67f1ab358296'],
    })
    genders: string[];
    
}