import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { Gender } from "./entities/gender.entity";

@Injectable()
export class GenderService{
    constructor(private readonly prisma: PrismaService){}

    findAll(): Promise<Gender[]> {
        return this.prisma.gender.findMany()
    }

    async findById(id: string): Promise<Gender> {
        const record = await this.prisma.gender.findUnique({where: {id}});

        if(!record) {
            throw new NotFoundException(`Registro com o ${id} não encontrado`);
        }

        return record;
    }

    findOne(id: string): Promise<Gender> {
        return this.findById(id);
    }

    handleError(err: Error) {
        console.log(err.message);
        return undefined;
    }

    create(createGenderDto: CreateGenderDto): Promise<Gender> {
        const data: Gender = {...createGenderDto};
        return this.prisma.gender.create({
            data,
        }).catch(this.handleError);
    }

    async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
        await this.findById(id)
        const data: Partial<Gender> = {...dto};
        return this.prisma.gender.update({where: {id}, data});
    }

    async delete(id: string) {
        await this.findById(id);
        await this.prisma.gender.delete({where: {id}});
    }
}