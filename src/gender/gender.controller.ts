import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoggedUser } from "src/auth/logged-user.decorator";
import { User } from "src/user/entities/user.entity";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { Gender } from "./entities/gender.entity";
import { GenderService } from "./gender.service";

@ApiTags('gender')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('gender')
export class GenderController {
    constructor(private genderService: GenderService) {}

    @Get()
    @ApiOperation({
        summary: 'Listar todos os gêneros',
    })
    findAll(@LoggedUser() user: User): Promise<Gender[]> {
        return this.genderService.findAll(user.isAdmin);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar um gênero pelo id',
    })
    findOne(@LoggedUser() user: User, @Param('id') id: string): Promise<Gender>{
        return this.genderService.findOne(user.isAdmin, id)
    }

    @Post()
    @ApiOperation({
        summary: 'Criar um gênero',
    })
    create(@LoggedUser() user: User, @Body() dto: CreateGenderDto): Promise<Gender>{
        return this.genderService.create(user.isAdmin, dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um gênero pelo id',
    })
    update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateGenderDto): Promise<Gender>{
        return this.genderService.update(user.isAdmin, id, dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um gênero pelo id'
    })
    delete(@LoggedUser() user: User, @Param('id') id: string) {
        return this.genderService.delete(user.isAdmin, id);
    }
}
