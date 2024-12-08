import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmotionalRegulationTechniqueController } from './controllers/create-emotional-regulation-technique.controller';
import { DeleteEmotionalRegulationTechniqueController } from './controllers/delete-emotional-regulation-technique.controller';
import { EditEmotionalRegulationTechniqueController } from './controllers/edit-emotional-regulation-technique.controller';
import { GetEmotionalRegulationTechniqueController } from './controllers/get-emotional-regulation-technique.controller';
import { ListEmotionalRegulationTechniqueController } from './controllers/list-emotional-regulation-technique.controller';

@Module({
  controllers: [
    CreateEmotionalRegulationTechniqueController,
    DeleteEmotionalRegulationTechniqueController,
    EditEmotionalRegulationTechniqueController,
    GetEmotionalRegulationTechniqueController,
    ListEmotionalRegulationTechniqueController
  ],
  providers: [PrismaService]
})
export class EmotionalRegulationTechniquesModule {}