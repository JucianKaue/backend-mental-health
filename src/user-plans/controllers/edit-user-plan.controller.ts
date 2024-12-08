import { Body, Controller, NotFoundException, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TokenPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editUserPlansBodySchema = z.object({
    status: z.string(),
})

type EditUserPlansBodySchema = z.infer<typeof editUserPlansBodySchema>


@Controller('plans')
@UseGuards(JwtAuthGuard)
export class EditUserPlansController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(editUserPlansBodySchema))
    async handle(
        @Body() body: EditUserPlansBodySchema,
        @Req() request: Request,
        @Param('id') id: string
    ) {
        const user = request.user as TokenPayload

        const entity = await this.prisma.userPlans.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        })
        if (!entity) {
            throw new NotFoundException('This plan id does not exits')
        }

        let endDate: Date | null = null;
        if(body.status === 'cancelled') {
            endDate = new Date()
        }

        return await this.prisma.userPlans.update({
            where: { id: id, deletedAt: null},
            data: {
                status: body.status,
                endDate: endDate
            }
        })
    }
}

function toBigInt(number: number) {
    return number*100
  }

function toDecimal(number: number) {
    return number/100
}