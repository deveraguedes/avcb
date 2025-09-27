"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjetosService = class ProjetosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjetoDto) {
        return this.prisma.projeto.create({
            data: {
                nome: createProjetoDto.nome,
                userId: createProjetoDto.userId,
                data_criacao: new Date(),
                situacao: 1,
            },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.projeto.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                data_criacao: 'desc',
            },
        });
    }
    async findOne(id, userId) {
        return this.prisma.projeto.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        });
    }
    async update(id, updateData, userId) {
        return this.prisma.projeto.update({
            where: {
                id: id,
            },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
    }
    async remove(id, userId) {
        return this.prisma.projeto.delete({
            where: {
                id: id,
            },
        });
    }
};
exports.ProjetosService = ProjetosService;
exports.ProjetosService = ProjetosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjetosService);
//# sourceMappingURL=projetos.service.js.map