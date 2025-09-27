import { Module } from '@nestjs/common';
import { ClassificacaoController } from './classificacao.controller';
import { ClassificacaoService } from './classificacao.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClassificacaoController],
  providers: [ClassificacaoService],
  exports: [ClassificacaoService],
})
export class ClassificacaoModule {}
