import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createPlaceBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    state: z.string()
})

type CreatePlaceBodySchema = z.infer<typeof createPlaceBodySchema>

@Controller('/places')
@UseGuards(JwtAuthGuard)
export class CreatePlaceController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createPlaceBodySchema))
    async handle(
        @Body() place: CreatePlaceBodySchema,
        @Req() request: Request
    ) {
        const user = request.user as TokenPayload
        const { name, city, state } = place


        return this.prisma.place.create({
            data: {
                name,
                city,
                state,
                authorId: user.sub
            }
        })
    }
}