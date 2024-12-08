import { Controller, Get, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('plans')
@UseGuards(JwtAuthGuard)
export class GetPlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get(':id')
    async handle(
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        const entity = await this.prisma.plans.findUnique({
            where: {
                id: id,
                deletedAt: null
            }
        })

        if (!entity) {
            throw new NotFoundException('This plan id does not exits')
        }

        return {
            id: entity.id,
            name: entity.name,
            price: toDecimal(Number(entity.price)),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        }
    }
}

function toDecimal(number: number) {
    return number/100
}