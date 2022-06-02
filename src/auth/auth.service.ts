import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { profiles: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({email}),
      user,
    };
  }
}
