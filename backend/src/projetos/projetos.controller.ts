import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjetosService, CreateProjetoDto } from './projetos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projetos')
@UseGuards(JwtAuthGuard)
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Post()
  create(@Body() createProjetoDto: Omit<CreateProjetoDto, 'userId'>, @Request() req) {
    const userId = req.user.userId;
    return this.projetosService.create({
      ...createProjetoDto,
      userId: userId,
    });
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.projetosService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.projetosService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: Partial<CreateProjetoDto>, @Request() req) {
    const userId = req.user.userId;
    return this.projetosService.update(+id, updateProjetoDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.projetosService.remove(+id, userId);
  }
}
