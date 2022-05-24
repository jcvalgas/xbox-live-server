import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {
    @IsString()
    @ApiProperty({
        description: 'Nome do Gênero',
        example: 'RPG'
    })
    name: string
}