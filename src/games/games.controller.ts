import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGamesDto } from "./dto/create-games.dto";
import { GamesService } from "./games.service";

@ApiTags('games')
@Controller('games')
export class GamesController {
    constructor(private gamesService: GamesService) {}

    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    @Post()
    create(@Body() createGamesDto: CreateGamesDto){
        return this.gamesService.create(createGamesDto);
    }
}