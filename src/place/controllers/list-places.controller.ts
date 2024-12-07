import { Controller, Get, NotFoundException, Param, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

interface Place {
    id: string;
    name: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date | null;
    authorId: string;
  }

// About this route, it was not deitailed if it was
@Controller('places')
@UseGuards(JwtAuthGuard)
export class ListPlacesController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get('')
    async handle(
        @Req() request: Request,
        @Query('name') name: string
    ) {

        const user = request.user as TokenPayload

        let places: Place[] | undefined
        // If there is a query param "name", find rows that "name" constains the search.
        // Else, get All places
        if (name) {
            places = await this.prisma.place.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            })
        } else {
            places = await this.prisma.place.findMany()
        }
        
        if (!places) {
            throw new NotFoundException('There is no places available')
        }

        return {
            places: places
        }
    }
}