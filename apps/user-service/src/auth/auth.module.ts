import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports :[
        UserModule,
        PassportModule,
        ConfigModule,
    ],
    providers : [AuthService,JwtStrategy,JwtService],
    controllers : [AuthController],
})
export class AuthModule {}
