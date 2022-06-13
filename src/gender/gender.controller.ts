import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
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
    findAll(): Promise<Gender[]> {
        return this.genderService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar um gênero pelo id',
    })
    findOne(@Param('id') id: string): Promise<Gender>{
        return this.genderService.findOne(id)
    }

    @Post()
    @ApiOperation({
        summary: 'Criar um gênero',
    })
    create(@Body() dto: CreateGenderDto): Promise<Gender>{
        return this.genderService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um gênero pelo id',
    })
    update(@Param('id') id: string, @Body() dto: UpdateGenderDto): Promise<Gender>{
        return this.genderService.update(id, dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um gênero pelo id'
    })
    delete(@Param('id') id: string) {
        return this.genderService.delete(id);
    }
}
