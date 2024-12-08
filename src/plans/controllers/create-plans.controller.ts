import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createPlansSchema = z.object({
    name: z.string(),
    price: z.number()
})

type CreatePlansSchema = z.infer<typeof createPlansSchema>

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class CreatePlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createPlansSchema))
    async handle(
        @Body() body: CreatePlansSchema,
        @Req() request: Request
    ) {
        const user = request.user as TokenPayload
        const { name, price } = body

        


        const output = await this.prisma.plans.create({
            data: {
                id: randomUUID(),
                name: name,
                price: toBigInt(price),
            }
        })

        return {
            id: output.id,
            name: output.name,
            price: toDecimal(Number(output.price)),
            createdAt: output.createdAt,
            updatedAt: output.updatedAt,
            deletedAt: output.deletedAt
        }
    }
}

function toBigInt(number: number) {
    return number*100
  }

function toDecimal(number: number) {
    return number/100
}