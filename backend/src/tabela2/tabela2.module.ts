import { Module } from '@nestjs/common';
import { Tabela2Controller } from './tabela2.controller';
import { Tabela2Service } from './tabela2.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [Tabela2Controller],
  providers: [Tabela2Service],
  exports: [Tabela2Service],
})
export class Tabela2Module {}