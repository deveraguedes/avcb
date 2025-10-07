import { Module } from '@nestjs/common';
import { AnexoaService } from './anexoa.service';
import { AnexoaController } from './anexoa.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnexoaController],
  providers: [AnexoaService],
  exports: [AnexoaService],
})
export class AnexoaModule {}