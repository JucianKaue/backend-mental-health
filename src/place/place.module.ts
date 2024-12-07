import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaceController } from './controllers/create-place.controller';
import { EditPlaceController } from './controllers/edit-place.controller';
import { DeletePlaceController } from './controllers/delete-place.controller';
import { GetPlaceController } from './controllers/get-place.controller';
import { ListPlacesController } from './controllers/list-places.controller';

@Module({
  controllers: [
    CreatePlaceController,
    EditPlaceController,
    DeletePlaceController,
    GetPlaceController,
    ListPlacesController
  ],
  providers: [PrismaService]
})
export class PlaceModule {}