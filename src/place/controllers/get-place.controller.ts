import { Controller, Get, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('places')
@UseGuards(JwtAuthGuard)
export class GetPlaceController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Get(':id')
    async handle(
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        const place = await this.prisma.place.findUnique({
            where: {
                id: id
            }
        })

        if (!place) {
            throw new NotFoundException('This place does not exists')
        }

        return place
    }
}