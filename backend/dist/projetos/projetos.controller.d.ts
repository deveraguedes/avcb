import { ProjetosService, CreateProjetoDto } from './projetos.service';
export declare class ProjetosController {
    private readonly projetosService;
    constructor(projetosService: ProjetosService);
    create(createProjetoDto: {
        nome: string;
    }, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }[]>;
    findOne(id: string, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    update(id: string, updateProjetoDto: Partial<CreateProjetoDto>, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        data_criacao: Date;
        situacao: number;
        userId: string;
    }>;
}
