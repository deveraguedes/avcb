import { PrismaService } from '../prisma/prisma.service';
export interface CreateTaskDto {
    title: string;
    description?: string;
    userId: string;
}
export interface UpdateTaskDto {
    title?: string;
    description?: string;
    completed?: boolean;
}
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    findAll(userId?: string): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    remove(id: string): Promise<void>;
}
