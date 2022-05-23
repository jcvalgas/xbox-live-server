import { isNumber, isPositive, isString } from "class-validator";

export class CreateGamesDto {
    title: string
    coverImageUrl: string
    description: string
    year: number
    imdbScore: number;
    trailerYoutubeUrl: string
    gameplayYoutubeUrl: string;
}