import { Controller, Get, NotFoundException, Param, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class ListPlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get('')
    async handle(
        @Req() request: Request,
        @Query('name') name: string
    ) {

        const user = request.user as TokenPayload

        const plans = await this.prisma.plans.findMany({
            where: {
                deletedAt: null
            }
        })
        
        
        if (!plans) {
            throw new NotFoundException('There is no plans available')
        }

        return {
            data: plans.map((item) => ({
                id: item.id,
                name: item.name,
                price: toDecimal(Number(item.price)),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                deletedAt: item.deletedAt
            }))
        }
    }
}

function toDecimal(number: number) {
    return number/100
}