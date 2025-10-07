import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnexoaService } from './anexoa.service';
import { Prisma } from '@prisma/client';

@Controller('anexoa')
export class AnexoaController {
  constructor(private readonly anexoaService: AnexoaService) {}

  @Post()
  create(@Body() createAnexoaDto: Prisma.AnexoACreateInput) {
    return this.anexoaService.create(createAnexoaDto);
  }

  @Get()
  findAll() {
    return this.anexoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anexoaService.findOne(+id);
  }

  @Get('cnae/:cnae')
  findByCnae(@Param('cnae') cnae: string) {
    return this.anexoaService.findByCnae(cnae);
  }

  @Get('divisao/:divisao')
  findByDivisao(@Param('divisao') divisao: string) {
    return this.anexoaService.findByDivisao(divisao);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnexoaDto: Prisma.AnexoAUpdateInput) {
    return this.anexoaService.update(+id, updateAnexoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anexoaService.remove(+id);
  }

  @Delete('all')
  removeAll() {
    return this.anexoaService.deleteAll();
  }

  @Post('popular-dados')
  popularDados() {
    return this.anexoaService.popularDados();
  }
}