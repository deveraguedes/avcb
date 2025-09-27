import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjetosModule } from './projetos/projetos.module';
import { ClassificacaoModule } from './classificacao/classificacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestController } from './test.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TasksModule,
    ProjetosModule,
    ClassificacaoModule,
  ],
  controllers: [TestController],
})
export class AppModule {}
