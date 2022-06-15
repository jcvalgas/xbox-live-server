import { Profile } from "src/profile/entities/profile.entity";

export class User {
    id?: string;
    name: string;
    email: string;
    password: string;
    cpf: number;
    isAdmin: boolean;

    profiles?: Profile[]

    createdAt?: Date;
    updatedAt?: Date;
}
