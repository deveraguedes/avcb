import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClassificacaoService } from './classificacao.service';

@Controller('classificacao')
export class ClassificacaoController {
  constructor(private readonly classificacaoService: ClassificacaoService) {}

  @Get()
  async findAll() {
    return this.classificacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classificacaoService.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.classificacaoService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.classificacaoService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.classificacaoService.remove(+id);
  }

  @Post('popular-dados')
  async popularDados() {
    const dados = [
      {
        codigo: 'A-1',
        ocupacao: 'Residencial',
        classificacao: 'Habitação Unifamiliar',
        grupo: 'A',
        subgrupo: 'A-1',
        divisao: 'Casas térreas ou sobrados',
        observacoes: 'Casas, sobrados, condomínios residenciais'
      },
      {
        codigo: 'A-2',
        ocupacao: 'Residencial',
        classificacao: 'Habitação Multifamiliar',
        grupo: 'A',
        subgrupo: 'A-2',
        divisao: 'Edifícios de apartamentos',
        observacoes: 'Apartamentos, quitinetes, flats'
      },
      {
        codigo: 'B-1',
        ocupacao: 'Serviços de Hospedagem',
        classificacao: 'Hotéis e Similares',
        grupo: 'B',
        subgrupo: 'B-1',
        divisao: 'Hotéis, motéis, pousadas',
        observacoes: 'Estabelecimentos com mais de 16 leitos'
      },
      {
        codigo: 'C-1',
        ocupacao: 'Comercial',
        classificacao: 'Comércio com baixa carga de incêndio',
        grupo: 'C',
        subgrupo: 'C-1',
        divisao: 'Comércio de baixo risco',
        observacoes: 'Livrarias, farmácias, floriculturas'
      },
      {
        codigo: 'C-2',
        ocupacao: 'Comercial',
        classificacao: 'Comércio com média carga de incêndio',
        grupo: 'C',
        subgrupo: 'C-2',
        divisao: 'Supermercados, lojas',
        observacoes: 'Supermercados, shopping centers, galerias'
      },
      {
        codigo: 'D-1',
        ocupacao: 'Serviços Profissionais',
        classificacao: 'Escritórios',
        grupo: 'D',
        subgrupo: 'D-1',
        divisao: 'Locais para prestação de serviços',
        observacoes: 'Escritórios, consultórios, repartições'
      },
      {
        codigo: 'E-1',
        ocupacao: 'Educacional',
        classificacao: 'Escolas em geral',
        grupo: 'E',
        subgrupo: 'E-1',
        divisao: 'Estabelecimentos de ensino',
        observacoes: 'Creches, escolas, faculdades'
      },
      {
        codigo: 'F-1',
        ocupacao: 'Local de Reunião de Público',
        classificacao: 'Esporte',
        grupo: 'F',
        subgrupo: 'F-1',
        divisao: 'Locais esportivos',
        observacoes: 'Ginásios, estádios, quadras'
      }
    ];

    const results = [];
    for (const item of dados) {
      try {
        const result = await this.classificacaoService.create(item);
        results.push(result);
      } catch (error) {
        console.error('Erro ao inserir:', item.codigo, error.message);
      }
    }

    return { message: 'Dados inseridos com sucesso', count: results.length, data: results };
  }
}
