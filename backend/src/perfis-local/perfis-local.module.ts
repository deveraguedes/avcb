import { Module } from '@nestjs/common';
import { PerfilLocalController } from './perfis-local.controller';
import { PerfilLocalService } from './perfis-local.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PerfilLocalController],
  providers: [PerfilLocalService],
  exports: [PerfilLocalService],
})
export class PerfilLocalModule {}
