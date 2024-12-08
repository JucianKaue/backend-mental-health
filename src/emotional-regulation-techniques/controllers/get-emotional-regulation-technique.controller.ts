import { Controller, Get, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emotional-regulation-techniques')
@UseGuards(JwtAuthGuard)
export class GetEmotionalRegulationTechniqueController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get(':id')
    async handle(
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        const emotionalRegulationTechnique = await this.prisma.emotionalRegulationTechnique.findUnique({
            where: {
                id: id,
                deletedAt: null
            }
        })

        if (!emotionalRegulationTechnique) {
            throw new NotFoundException('This emotional regulation technique id does not exits')
        }

        return emotionalRegulationTechnique
    }
}