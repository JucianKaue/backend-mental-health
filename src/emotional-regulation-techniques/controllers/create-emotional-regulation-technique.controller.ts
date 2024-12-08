import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createEmotionalRegulationTechniqueBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    video_url: z.string(),
})

type CreateEmotionalRegulationTechniqueBodySchema = z.infer<typeof createEmotionalRegulationTechniqueBodySchema>

@Controller('emotional-regulation-techniques')
@UseGuards(JwtAuthGuard)
export class CreateEmotionalRegulationTechniqueController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createEmotionalRegulationTechniqueBodySchema))
    async handle(
        @Body() body: CreateEmotionalRegulationTechniqueBodySchema,
        @Req() request: Request
    ) {
        const user = request.user as TokenPayload
        const { name, description, category, video_url } = body


        return this.prisma.emotionalRegulationTechnique.create({
            data: {
                id: randomUUID(),
                name,
                description,
                category,
                video_url,
                created_by: user.sub
            }
        })
    }
}