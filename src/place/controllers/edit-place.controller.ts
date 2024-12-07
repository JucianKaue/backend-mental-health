import { Body, Controller, NotFoundException, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editPlaceBodySchema = z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional()
})

type EditPlaceBodySchema = z.infer<typeof editPlaceBodySchema>


@Controller('places')
@UseGuards(JwtAuthGuard)
export class EditPlaceController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(editPlaceBodySchema))
    async handle(
        @Body() place: EditPlaceBodySchema,
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload
        const { name, city, state } = place

        // Ensure id is correctly extracted and not undefined
        if (!id) {
            throw new NotFoundException(`ID parameter is missing`);
        }

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

        return this.prisma.place.update({
            where: { id, },
            data: place
        })
    }
}