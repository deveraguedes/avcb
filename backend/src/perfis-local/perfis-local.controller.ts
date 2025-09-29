import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PerfilLocalService } from './perfis-local.service';
import { CreatePerfilLocalDto } from './dto/create-perfil-local.dto';
import { UpdatePerfilLocalDto } from './dto/update-perfil-local.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('perfis-local')
@UseGuards(JwtAuthGuard)
export class PerfilLocalController {
  constructor(private readonly perfilLocalService: PerfilLocalService) {}

  @Post()
  create(@Body() createPerfilLocalDto: CreatePerfilLocalDto) {
    return this.perfilLocalService.create(createPerfilLocalDto);
  }

  @Get()
  findAll() {
    return this.perfilLocalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfilLocalService.findOne(id);
  }

  @Get('projeto/:projetoId')
  findByProjeto(@Param('projetoId', ParseIntPipe) projetoId: number) {
    return this.perfilLocalService.findByProjeto(projetoId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerfilLocalDto: UpdatePerfilLocalDto,
  ) {
    return this.perfilLocalService.update(id, updatePerfilLocalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.perfilLocalService.remove(id);
  }
}
