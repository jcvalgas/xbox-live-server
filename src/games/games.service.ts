import { Injectable } from "@nestjs/common";
import { CreateGamesDto } from "./dto/create-games.dto";
import { Game } from "./entities/games.entity";

@Injectable()
export class GamesService{
    games: Game[] = [];

    findAll(){
        return this.games;
    }

    create(createGamesDto: CreateGamesDto){
        const game: Game = {id: 'random id', ...createGamesDto};
        this.games.push(game);
        return game;
    }
}
