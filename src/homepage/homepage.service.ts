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
    console.log(user.profiles);
    const profile = user.profiles.find((profile) => profile.id == profileId);
    console.log(profile);
    if(!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }
    
    const favoritos = await this.prisma.profile.findUnique({where: {id: profile.id}, include: {favoritos: true}})
    const games = await this.prisma.game.findMany({select: this.gamesSelect});
    const gameByGender = await this.prisma.gender.findMany({select: this.gameByGenderSelect});
    return {games, gameByGender, favoritos};
  }
}
