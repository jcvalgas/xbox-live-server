import { Game } from "src/games/entities/games.entity";
import { User } from "src/user/entities/user.entity";

export class Profile {
    id?: string;
    user?: User;
    title: string;
    imageUrl: string;
    favoritos?: Game[];
    createdAt?: Date;
    updatedAt?: Date;
}
