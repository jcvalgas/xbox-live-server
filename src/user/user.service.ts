import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    createdAt: false,
    updatedAt: false
  }

  constructor(private readonly prisma: PrismaService){}

  findAll(isAdmin: boolean): Promise<User[]> {
    if(!isAdmin) {
      throw new UnauthorizedException("Usuário não é um administrador para executar essa tarefa")
    }
    return this.prisma.user.findMany({select: this.userSelect});
  }

  async findOne(isAdmin: boolean, id: string): Promise<User> {
    if(!isAdmin) {
      throw new UnauthorizedException("Usuário não é um administrador para executar essa tarefa")
    }
    return this.findById(id)
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

  async update(isAdmin: boolean, id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if(!isAdmin) {
      throw new UnauthorizedException("Usuário não é um administrador para executar essa tarefa")
    }
    await this.findById(id)
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

  async delete(isAdmin: boolean, id: string) {
    if(!isAdmin) {
      throw new UnauthorizedException("Usuário não é um administrador para executar essa tarefa");
    }
    await this.findById(id);
    await this.prisma.user.delete({where: {id}})
  }

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: {id},
      select: this.userSelect
    });

    if(!record){
      throw new NotFoundException(`Registro com o id '${id}' não foi encontrado`);
    }

    return record;
  }
}

  