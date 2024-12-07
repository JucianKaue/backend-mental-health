import { Controller, Delete, NotFoundException, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('places')
@UseGuards(JwtAuthGuard)
export class DeletePlaceController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Delete(':id')
    async handle(
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        // Check if the place exits
        const checkIfThePlaceExits = await this.prisma.place.findFirst({
            where: {
                id: id
            }
        })
        if (!checkIfThePlaceExits) {
            throw new NotFoundException('This place id does not exits')
        }

        // Check if the user is the creator
        if (checkIfThePlaceExits.authorId !== user.sub) {
            throw new UnauthorizedException('You does not have access to edit this place')
        }

        return this.prisma.place.delete({
            where: {
                id,
            }
        })

    }
}