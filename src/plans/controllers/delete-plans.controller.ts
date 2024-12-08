import { Controller, Delete, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('plans')
@UseGuards(JwtAuthGuard)
export class DeletePlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Delete(':id')
    async handle(
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
            where: {
                id,
            },
            data: {
                deletedAt: new Date()
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

function toDecimal(number: number) {
    return number/100
}