import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { handleError } from 'src/utils/handle-error.util';


@Injectable()
export class ProfileService {
  
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findOne(id: string): Promise<Profile> {
    const record = await this.prisma.profile.findUnique({where: {id}});

    if(!record){
      throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
    }

    return record;
  }

  create(createProfileDto: CreateProfileDto) {
    const data: Profile = {...createProfileDto};
    return this.prisma.profile.create({data}).catch(handleError);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);
    const data: Partial<Profile> = {...updateProfileDto};
    return this.prisma.profile.update({where: {id}, data});
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.profile.delete({where: {id}});
  }
}
