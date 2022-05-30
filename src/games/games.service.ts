import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGamesDto } from "./dto/create-games.dto";
import { UpdateGameDto } from "./dto/update-games.dto";
import { Game } from "./entities/games.entity";
import { handleError } from 'src/utils/handle-error.util';
import { Prisma } from "@prisma/client";
import { Gender } from "src/gender/entities/gender.entity";


@Injectable()
export class GamesService{
    constructor(private readonly prisma: PrismaService){}

    findAll(){
        return this.prisma.game.findMany({
            select: {
                id: true,
                title: true,
                coverImageUrl: true,
                genders: {
                    select: {
                        name: true
                    }
                },
            },
        });
    }

    async findById(id: string): Promise<Game> {
        const record = await this.prisma.game.findUnique({where: {id}});

        if(!record) {
            throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
        }

        return record;
    }

    async findOne(id: string){
        await this.findById(id)
        return this.prisma.game.findUnique({
            where: {id},
            include: {
                genders: {
                    select: {
                        name: true,
                    }
                },
            }
        }).catch(handleError);
    }

    create(createGamesDto: CreateGamesDto){
        const data: Prisma.GameCreateInput = {
            title: createGamesDto.title,
            coverImageUrl: createGamesDto.coverImageUrl,
            description: createGamesDto.description,
            year: createGamesDto.year,
            imdbScore: createGamesDto.imdbScore,
            trailerYoutubeUrl: createGamesDto.trailerYoutubeUrl,
            gameplayYoutubeUrl: createGamesDto.gameplayYoutubeUrl,
            genders: {
                connect: createGamesDto.genders.map(genderId => ({id: genderId})),
            }
        };
        return this.prisma.game.create({
            data,
        }).catch(handleError);
    }

    async update(id: string, dto: UpdateGameDto) {
        const data: Prisma.GameUpdateInput = {
            ...dto,
            genders: {
                connect: dto.genders.map(genderId => ({id: genderId}))
            }
        }
        return this.prisma.game.update({where: {id}, data}).catch(handleError);
    }

    async delete(id: string) {
        await this.findById(id);
        await this.prisma.game.delete({where: {id}}).catch(handleError);
    }
}
