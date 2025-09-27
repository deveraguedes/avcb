import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateProjetoDto {
  nome: string;
  nome_empresa: string;
  cnpj: string;
  cnae: string;
  endereco: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone_contato: string;
  responsavel: string;
  tipo_projeto: string;
  numero_projeto_anterior?: string;
  userId: string;
}

@Injectable()
export class ProjetosService {
  constructor(private prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    return this.prisma.projeto.create({
      data: {
        nome: createProjetoDto.nome,
        nome_empresa: createProjetoDto.nome_empresa,
        cnpj: createProjetoDto.cnpj,
        cnae: createProjetoDto.cnae,
        endereco: createProjetoDto.endereco,
        cep: createProjetoDto.cep,
        bairro: createProjetoDto.bairro,
        cidade: createProjetoDto.cidade,
        estado: createProjetoDto.estado,
        telefone_contato: createProjetoDto.telefone_contato,
        responsavel: createProjetoDto.responsavel,
        tipo_projeto: createProjetoDto.tipo_projeto,
        numero_projeto_anterior: createProjetoDto.numero_projeto_anterior,
        userId: createProjetoDto.userId,
        data_criacao: new Date(),
        situacao: 1,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.projeto.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        data_criacao: 'desc',
      },
    });
  }

  async findOne(id: number, userId: string) {
    return this.prisma.projeto.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  async update(id: number, updateData: Partial<CreateProjetoDto>, userId: string) {
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

  async remove(id: number, userId: string) {
    return this.prisma.projeto.delete({
      where: { 
        id: id,
      },
    });
  }
}
