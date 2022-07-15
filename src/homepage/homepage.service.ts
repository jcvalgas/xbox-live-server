import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  private gamesSelect = {
    id: true,
    title: true,
    coverImageUrl: true
  }

  private gameByGenderSelect = {
    name: true,
    games: {
      select: {
        id: true,
        title: true,
        coverImageUrl: true
      }
    }
  }

  async findOne(id: string, profileId: string) {
    const user = await this.prisma.user.findUnique({where: {id}, include: {profiles: true}})
    const profile = user.profiles.find((profile) => profile.id == profileId);
    if(!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }
    
    const favoritos = await this.prisma.profile.findUnique({where: {id: profile.id}, include: {favoritos: true}})
    const gameByGender = await this.prisma.gender.findMany({select: this.gameByGenderSelect});
    return {gameByGender, favoritos};
  }
}
