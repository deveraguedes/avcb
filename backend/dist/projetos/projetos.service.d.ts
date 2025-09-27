import { PrismaService } from '../prisma/prisma.service';
export interface CreateProjetoDto {
    nome: string;
    userId: string;
}
export declare class ProjetosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjetoDto: CreateProjetoDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    findAllByUser(userId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }[]>;
    findOne(id: number, userId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    update(id: number, updateData: Partial<CreateProjetoDto>, userId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    remove(id: number, userId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
}
