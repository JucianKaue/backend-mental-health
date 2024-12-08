import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createUserPlanSchema = z.object({
    userId: z.string().uuid(),
    planId: z.string().uuid(),
})

type CreateUserPlanSchema = z.infer<typeof createUserPlanSchema>

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class CreatePlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createUserPlanSchema))
    async handle(
        @Body() body: CreateUserPlanSchema,
        @Req() request: Request
    ) {
        const user = request.user as TokenPayload
        const { userId, planId } = body

        return await this.prisma.userPlans.create({
            data: {
                id: randomUUID(),
                userId: userId,
                planId: planId,
                status: 'active',
                startDate: new Date(),
            }
        })
    }
}