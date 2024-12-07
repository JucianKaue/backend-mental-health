import { Body, ConflictException, Controller, Get, NotFoundException, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes, scrypt as _scrypt} from "crypto"
import { promisify } from "util"
const scrypt = promisify(_scrypt)
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes';
import { JwtService } from '@nestjs/jwt';

const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type LoginBodySchema = z.infer<typeof loginBodySchema>

@Controller('auth')
export class LoginController {
    constructor (
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(loginBodySchema))
    async createUser(@Body() body: LoginBodySchema) {
        const { email, password } = body

        // get user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })
        
        // check there is a user
        if (!user) {
            throw new UnauthorizedException("The credentials does not match")
        }

        // Create the hashedPassword with inserted password
        const salt = user.password.split('.')[1]
        const hash = await scrypt(password, salt, 64) as Buffer
        const hashedPassword = hash.toString('hex') + '.' + salt

        if (hashedPassword !== user.password) {
            throw new UnauthorizedException("The credentials does not match")
        }


        const accessToken = this.jwt.sign({
            sub: user.id
        })

        return {
            access_token: accessToken
        }
    }
}