import { Body, Controller, NotFoundException, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editEmotionalRegulationTechniqueBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    video_url: z.string().optional(),
})

type EditEmotionalRegulationTechniqueBodySchema = z.infer<typeof editEmotionalRegulationTechniqueBodySchema>


@Controller('emotional-regulation-techniques')
@UseGuards(JwtAuthGuard)
export class EditEmotionalRegulationTechniqueController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(editEmotionalRegulationTechniqueBodySchema))
    async handle(
        @Body() body: EditEmotionalRegulationTechniqueBodySchema,
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload
        const { name, description, category, video_url } = body;

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
            where: { id, },
            data: body
        })
    }
}