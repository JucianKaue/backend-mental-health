import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlansController } from './controllers/create-plans.controller';
import { DeletePlansController } from './controllers/delete-plans.controller';
import { EditPlansController } from './controllers/edit-plans.controller';
import { GetPlansController } from './controllers/get-plans.controller';
import { ListPlansController } from './controllers/list-plans.controller';

@Module({
  controllers: [
    CreatePlansController,
    DeletePlansController,
    EditPlansController,
    GetPlansController,
    ListPlansController
  ],
  providers: [PrismaService]
})
export class PlansModule {}