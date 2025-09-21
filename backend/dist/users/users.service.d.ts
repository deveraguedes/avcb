import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
}
export interface UpdateUserDto {
    email?: string;
    name?: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findOne(id: string): Promise<Omit<User, 'password'> | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>>;
    remove(id: string): Promise<void>;
}
