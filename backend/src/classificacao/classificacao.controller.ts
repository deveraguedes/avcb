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
}
