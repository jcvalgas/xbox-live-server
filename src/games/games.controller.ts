import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateGamesDto } from "./dto/create-games.dto";
import { GamesService } from "./games.service";
import { UpdateGameDto } from "./dto/update-games.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "src/auth/logged-user.decorator";
import { User } from "src/user/entities/user.entity";

@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    create(@LoggedUser() user: User, @Body() dto: CreateGamesDto){
        return this.gamesService.create(user.isAdmin, dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo pelo id',
    })
    update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateGameDto){
        return this.gamesService.update(user.isAdmin, id, dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um jogo pelo id'
    })
    delete(@LoggedUser() user: User, @Param('id') id: string) {
        return this.gamesService.delete(user.isAdmin, id);
    }
}