import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Tabela2Service } from './tabela2.service';

@Controller('tabela2')
export class Tabela2Controller {
  constructor(private readonly tabela2Service: Tabela2Service) {}

  @Get()
  async findAll() {
    return this.tabela2Service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tabela2Service.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.tabela2Service.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.tabela2Service.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tabela2Service.remove(+id);
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string) {
    return this.tabela2Service.findByTipo(tipo);
  }
}