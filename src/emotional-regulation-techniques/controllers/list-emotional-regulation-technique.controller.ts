import { Controller, Get, NotFoundException, Param, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

interface EmotionalRegulationTechnique {
    id: string;
    name: string;
    description: string;
    category: string;
    video_url: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

// About this route, it was not deitailed if it was
@Controller('emotional-regulation-techniques')
@UseGuards(JwtAuthGuard)
export class ListEmotionalRegulationTechniqueController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get('')
    async handle(
        @Req() request: Request,
        @Query('name') name: string
    ) {

        const user = request.user as TokenPayload

        let emotionalRegulationTechnique: EmotionalRegulationTechnique[] | undefined
        // If there is a query param "name", find rows that "name" constains the search.
        // Else, get All places
        if (name) {
            emotionalRegulationTechnique = await this.prisma.emotionalRegulationTechnique.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            })
        } else {
            emotionalRegulationTechnique = await this.prisma.emotionalRegulationTechnique.findMany({
                where: {
                    deletedAt: null
                }
            })
        }
        
        if (!emotionalRegulationTechnique) {
            throw new NotFoundException('There is no places available')
        }

        return {
            data: emotionalRegulationTechnique
        }
    }
}