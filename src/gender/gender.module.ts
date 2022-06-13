import {Module} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { GenderController } from "./gender.controller";
import { GenderService } from "./gender.service";

@Module({
    imports: [PrismaModule, PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [GenderController],
    providers: [GenderService],
})
export class GenderModule {}