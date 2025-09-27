import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificacaoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tabela1.findMany({
      orderBy: { codigo: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.tabela1.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.tabela1.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.tabela1.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.tabela1.delete({
      where: { id },
    });
  }

  async findByCodigo(codigo: string) {
    return this.prisma.tabela1.findUnique({
      where: { codigo },
    });
  }

  async findByGrupo(grupo: string) {
    return this.prisma.tabela1.findMany({
      where: { grupo },
      orderBy: { codigo: 'asc' },
    });
  }
}
