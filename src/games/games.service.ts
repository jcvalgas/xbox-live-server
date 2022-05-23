import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGamesDto } from "./dto/create-games.dto";
import { Game } from "./entities/games.entity";

@Injectable()
export class GamesService{
    constructor(private readonly prisma: PrismaService){}

    findAll(){
        return this.prisma.game.findMany();
    }

    create(createGamesDto: CreateGamesDto){
        const game: Game = {...createGamesDto};
        return this.prisma.game.create({
            data: game,
        });
    }
}
