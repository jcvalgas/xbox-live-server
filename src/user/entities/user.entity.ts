export class User {
    id?: string;
    name: string;
    email: string;
    password: string;
    cpf: number;
    isAdmin: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
