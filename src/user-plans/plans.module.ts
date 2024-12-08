import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlansController } from './controllers/create-user-plan.controller';
import { DeletePlansController } from './controllers/cancel-user-plan.controller';
import { EditPlansController } from './controllers/edit-user-plan.controller';
import { GetPlansController } from './controllers/get-user-plan.controller';
import { ListPlansController } from './controllers/list-user-plan.controller';

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