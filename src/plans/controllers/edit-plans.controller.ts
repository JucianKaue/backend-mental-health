import { Body, Controller, NotFoundException, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editPlansBodySchema = z.object({
    name: z.string().optional(),
    price: z.number().optional()
})

type EditPlansBodySchema = z.infer<typeof editPlansBodySchema>


@Controller('plans')
@UseGuards(JwtAuthGuard)
export class EditPlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(editPlansBodySchema))
    async handle(
        @Body() body: EditPlansBodySchema,
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        const entity = await this.prisma.plans.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        })
        if (!entity) {
            throw new NotFoundException('This plan id does not exits')
        }

        const output = await this.prisma.plans.update({
            where: { id: id, deletedAt: null},
            data: {
                name: body.name, 
                price: body.price ? toBigInt(body.price) : undefined
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