import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { EmotionalRegulationTechniquesModule } from './emotional-regulation-techniques/emotional-regulation-techniques.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
    PlaceModule,
    EmotionalRegulationTechniquesModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
