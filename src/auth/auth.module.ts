import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt"
const secret = process.env.SECRET || 'asdf';

@Module({
  controllers: [AuthController],
  providers:[AuthService,PrismaService],
  imports:[JwtModule.register({
    secret:secret
  })]
})
export class AuthModule {}
