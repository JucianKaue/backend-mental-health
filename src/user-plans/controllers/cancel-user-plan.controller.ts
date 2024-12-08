import { Controller, Delete, NotFoundException, Param, Put, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
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
            throw new NotFoundException('This user plan id does not exits')
        }


        return await this.prisma.userPlans.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}
