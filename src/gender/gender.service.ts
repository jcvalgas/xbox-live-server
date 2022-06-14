import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { Gender } from "./entities/gender.entity";
import { handleError } from 'src/utils/handle-error.util';


@Injectable()
export class GenderService{
    constructor(private readonly prisma: PrismaService){}

    findAll(isAdmin: boolean): Promise<Gender[]> {
        if(!isAdmin) {
            throw new UnauthorizedException('Usuário não é um administrador para executar essa tarefa');
        }
        return this.prisma.gender.findMany()
    }

    async findById(id: string): Promise<Gender> {
        const record = await this.prisma.gender.findUnique({where: {id}});

        if(!record) {
            throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
        }

        return record;
    }

    findOne(isAdmin: boolean, id: string): Promise<Gender> {
        if(!isAdmin) {
            throw new UnauthorizedException('Usuário não é um administrador para executar essa tarefa');
        }
        return this.findById(id);
    }

    create(isAdmin: boolean, createGenderDto: CreateGenderDto): Promise<Gender> {
        if(!isAdmin) {
            throw new UnauthorizedException('Usuário não é um administrador para essa tarefa');
        }
        const data: Gender = {...createGenderDto};
        return this.prisma.gender.create({
            data,
        }).catch(handleError);
    }

    async update(isAdmin: boolean, id: string, dto: UpdateGenderDto): Promise<Gender> {
        if(!isAdmin) {
            throw new UnauthorizedException('Usuário não é um administrador para essa tarefa');
        }
        await this.findById(id)
        const data: Partial<Gender> = {...dto};
        return this.prisma.gender.update({where: {id}, data});
    }

    async delete(isAdmin: boolean, id: string) {
        if(!isAdmin) {
            throw new UnauthorizedException('Usuário não é um administrador para essa tarefa');
        }
        await this.findById(id);
        await this.prisma.gender.delete({where: {id}});
    }
}