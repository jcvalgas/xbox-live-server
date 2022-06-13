import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id, createProfileDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar perfil de usuário'
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id, id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar perfil de usuário'
  })
  
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
