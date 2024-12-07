import { INestApplication } from "@nestjs/common"
import { AppModule } from "src/app.module"
import { Test } from '@nestjs/testing';
import { PrismaService } from "src/prisma/prisma.service";
import request from 'supertest';


describe('Create Account E2E', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AppModule],
        }).compile()
    
        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        
        await app.init()
    })

    test('[POST] /users', async () => {
        const response = await request(app.getHttpServer()).post('/users').send({
            email: "john.doe@gmail.com",
            password: "john.doe123"
        })
        expect(response.statusCode).toBe(201)

        const checkIfUserCreated = await prisma.user.findUnique({
            where: {
                email: "john.doe@gmail.com"
            }
        })
        expect(checkIfUserCreated).toBeTruthy()
    }) 

})