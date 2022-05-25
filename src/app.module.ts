import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GamesModule} from './games/games.module'
import { GenderModule } from './gender/gender.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [GamesModule, PrismaModule, GenderModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
