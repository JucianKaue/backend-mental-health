import { Module } from '@nestjs/common';
import { CreateAccountController } from '../users/controllers/create-account.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env';
import { LoginController } from '../users/controllers/auth.controller';

@Module({
  controllers: [CreateAccountController, LoginController],
  providers: [PrismaService]
})
export class AuthModule {}