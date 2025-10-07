import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class Tabela2Service {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tabela2.findMany({
      orderBy: { tipo: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.tabela2.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.tabela2.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.tabela2.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.tabela2.delete({
      where: { id },
    });
  }

  async findByTipo(tipo: string) {
    return this.prisma.tabela2.findUnique({
      where: { tipo },
    });
  }

  async deleteAll() {
    return this.prisma.tabela2.deleteMany({});
  }
}