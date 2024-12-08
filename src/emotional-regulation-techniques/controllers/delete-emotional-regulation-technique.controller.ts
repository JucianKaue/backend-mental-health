import { Controller, Delete, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emotional-regulation-techniques')
@UseGuards(JwtAuthGuard)
export class DeleteEmotionalRegulationTechniqueController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Delete(':id')
    async handle(
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        // Check if the emotional regulation technique exits
        const checkIfTheEmotionalRegulationTechniqueExits = await this.prisma.emotionalRegulationTechnique.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        })
        if (!checkIfTheEmotionalRegulationTechniqueExits) {
            throw new NotFoundException('This emotional regulation technique id does not exits')
        }


        return this.prisma.emotionalRegulationTechnique.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date()
            }
        })

    }
}