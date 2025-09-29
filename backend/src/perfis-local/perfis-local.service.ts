import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerfilLocalDto } from './dto/create-perfil-local.dto';
import { UpdatePerfilLocalDto } from './dto/update-perfil-local.dto';

@Injectable()
export class PerfilLocalService {
  constructor(private prisma: PrismaService) {}

  async create(createPerfilLocalDto: CreatePerfilLocalDto) {
    return this.prisma.perfilLocal.create({
      data: createPerfilLocalDto,
      include: {
        projeto: true,
      },
    });
  }

  async findAll() {
    return this.prisma.perfilLocal.findMany({
      include: {
        projeto: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.perfilLocal.findUnique({
      where: { id },
      include: {
        projeto: true,
      },
    });
  }

  async findByProjeto(projetoId: number) {
    return this.prisma.perfilLocal.findMany({
      where: { projetoId },
      include: {
        projeto: true,
      },
    });
  }

  async update(id: number, updatePerfilLocalDto: UpdatePerfilLocalDto) {
    return this.prisma.perfilLocal.update({
      where: { id },
      data: updatePerfilLocalDto,
      include: {
        projeto: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.perfilLocal.delete({
      where: { id },
    });
  }
}
