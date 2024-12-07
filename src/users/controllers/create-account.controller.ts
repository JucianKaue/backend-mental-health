import { Body, ConflictException, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes, scrypt as _scrypt} from "crypto"
import { promisify } from "util"
const scrypt = promisify(_scrypt)
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes';

const createAccountBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('users')
export class CreateAccountController {
    constructor (
        private prisma: PrismaService
    ) {}

    @Post('/')
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async createUser(@Body() body: CreateAccountBodySchema) {
        const { email, password } = body

        // Check if the email is available
        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (userWithSameEmail) {
            throw new ConflictException("There is another account with this email")
        }

        // Create hashed password and add the salt
        const salt = randomBytes(8).toString('hex')
        const hash = await scrypt(password, salt, 64) as Buffer
        const hashedPassword = hash.toString('hex') + '.' + salt

        const User = await this.prisma.user.create({
            data: {
                "email": email,
                "password": hashedPassword
            }
        })
        return {
            'user': User
        }
    }
}