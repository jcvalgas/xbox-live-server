import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { handleError } from 'src/utils/handle-error.util';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProfileService {
  
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
          }
        },
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        favoritos: {
          select: {
            id: true,
            coverImageUrl: true,
            description: true,
            genders: {
              select: {
                name: true,
              }
            },
            imdbScore: true,
            title: true,
            trailerYoutubeUrl: true,
            gameplayYoutubeUrl: true,
          }
        }
      }
    })
  }

  create(userId: string, createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: createProfileDto.title,
      imageUrl: createProfileDto.imageUrl,
      user: {
        connect: {
          id: userId,
        }
      }
    }
    return this.prisma.profile.create({data}).catch(handleError);
  }

  async update(userId: string, id: string, updateProfileDto: UpdateProfileDto) {
    const data: Prisma.ProfileUpdateInput = {
      title: updateProfileDto.title,
      imageUrl: updateProfileDto.imageUrl,
      user: {
        connect: {
          id: userId,
        }
      },
      favoritos: {
        connect: updateProfileDto.favoritos.map(gameId => ({id: gameId}))
      },
    }
    return this.prisma.profile.update({
      where: {id},
      data,
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            name: true,
          }
        },
        favoritos: true,
      }
    })
  };


  async delete(id: string) {
    return this.prisma.profile.delete({where: {id}}).catch(handleError);
  }
}

