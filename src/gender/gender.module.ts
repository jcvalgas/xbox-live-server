import {Module} from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GenderController } from "./gender.controller";
import { GenderService } from "./gender.service";

@Module({
    imports: [PrismaModule],
    controllers: [GenderController],
    providers: [GenderService],
})
export class GenderModule {}