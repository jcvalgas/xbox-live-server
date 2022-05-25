import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis do usuário',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar perfil do usuário pelo id',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar perfil de usuário',
  })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar perfil de usuário'
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar perfil de usuário'
  })
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
