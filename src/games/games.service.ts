import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGamesDto } from "./dto/create-games.dto";
import { UpdateGameDto } from "./dto/update-games.dto";
import { Game } from "./entities/games.entity";
import { handleError } from 'src/utils/handle-error.util';


@Injectable()
export class GamesService{
    constructor(private readonly prisma: PrismaService){}

    findAll(): Promise<Game[]>{
        return this.prisma.game.findMany();
    }

    async findById(id: string): Promise<Game> {
        const record = await this.prisma.game.findUnique({where: {id}});

        if(!record) {
            throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
        }

        return record;
    }

    async findOne(id: string): Promise<Game> {
        return this.findById(id);
    }

    create(createGamesDto: CreateGamesDto){
        const data: Game = {...createGamesDto};
        return this.prisma.game.create({
            data,
        }).catch(handleError);
    }

    async update(id: string, dto: UpdateGameDto): Promise<Game> {
        await this.findById(id)
        const data: Partial<Game> = {...dto};

        return this.prisma.game.update({where: {id}, data});
    }

    async delete(id: string) {
        await this.findById(id);
        await this.prisma.game.delete({where: {id}});
    }
}
