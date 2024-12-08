import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { EmotionalRegulationTechniquesModule } from './emotional-regulation-techniques/emotional-regulation-techniques.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
    EmotionalRegulationTechniquesModule,
    PlansModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
