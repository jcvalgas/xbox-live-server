import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: false,
    profiles: true,
    createdAt: true,
    updatedAt: true
  }

  constructor(private readonly prisma: PrismaService){}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({select: this.userSelect});
  }

  async findOne(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: {id},
      select: this.userSelect
    });

    if(!record){
      throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
    }

    return record;
  }

  async create(createUserDto: CreateUserDto): Promise <User> {
    if(createUserDto.password != createUserDto.confirmPassword){
      throw new BadRequestException('As senhas informadas não conferem');
    }

    delete createUserDto.confirmPassword;
    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    };

    return this.prisma.user.create({data, select: this.userSelect}).catch(handleError);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id)
    if(updateUserDto.password){
      if(updateUserDto.password != updateUserDto.confirmPassword){
        throw new BadRequestException('As senhas informadas não conferem');
      }
    }
    
    delete updateUserDto.confirmPassword;
    const data: Partial<User> = {
      ...updateUserDto
    }

    if(data.password){
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      data,
      where: {id},
      select: this.userSelect
    })
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({where: {id}})
  }
}
