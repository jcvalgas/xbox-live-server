import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateGamesDto } from "./dto/create-games.dto";
import { GamesService } from "./games.service";
import { Game } from "./entities/games.entity";
import { UpdateGameDto } from "./dto/update-games.dto";

@ApiTags('games')
@Controller('games')
export class GamesController {
    constructor(private gamesService: GamesService) {}

    @Get()
    @ApiOperation({
        summary: 'Listar todos os jogos',
    })
    findAll(){
        return this.gamesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar um jogo pelo id',
    })
    findOne(@Param('id') id: string){
        return this.gamesService.findOne(id)
    }

    @Post()
    @ApiOperation({
        summary: 'Criar um jogo',
    })
    create(@Body() dto: CreateGamesDto){
        return this.gamesService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo pelo id',
    })
    update(@Param('id') id: string, @Body() dto: UpdateGameDto){
        return this.gamesService.update(id, dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um jogo pelo id'
    })
    delete(@Param('id') id: string) {
        return this.gamesService.delete(id);
    }
}