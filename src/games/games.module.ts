import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
    imports: [PrismaModule, PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [GamesController],
    providers: [GamesService]
})
export class GamesModule{}
