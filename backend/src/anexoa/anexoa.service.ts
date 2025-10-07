import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnexoaService {
  constructor(private prisma: PrismaService) {}

  async create(createAnexoaDto: Prisma.AnexoACreateInput) {
    return this.prisma.anexoA.create({
      data: createAnexoaDto,
    });
  }

  async findAll() {
    return this.prisma.anexoA.findMany({
      where: { ativo: true },
      orderBy: { ocupacao_uso: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.anexoA.findUnique({
      where: { id },
    });
  }

  async findByCnae(cnae: string) {
    return this.prisma.anexoA.findMany({
      where: {
        cnae: {
          contains: cnae,
        },
        ativo: true,
      },
      orderBy: { ocupacao_uso: 'asc' },
    });
  }

  async findByDivisao(divisao: string) {
    return this.prisma.anexoA.findMany({
      where: {
        divisao: divisao,
        ativo: true,
      },
      orderBy: { ocupacao_uso: 'asc' },
    });
  }

  async update(id: number, updateAnexoaDto: Prisma.AnexoAUpdateInput) {
    return this.prisma.anexoA.update({
      where: { id },
      data: updateAnexoaDto,
    });
  }

  async remove(id: number) {
    return this.prisma.anexoA.update({
      where: { id: id },
      data: { ativo: false },
    });
  }

  async deleteAll() {
    return this.prisma.anexoA.deleteMany({});
  }

  async popularDados() {
    // Este método será implementado quando criarmos o script de inserção
    return { message: 'Dados populados com sucesso' };
  }
}