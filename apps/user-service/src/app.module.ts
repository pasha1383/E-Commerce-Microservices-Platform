import {Module} from '@nestjs/common';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {AuthController} from './auth/auth.controller';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath : '.env',
        }),
        PrismaModule,
        UserModule,
        AuthModule
    ],
    controllers: [AuthController],
    providers: [UserService, AuthService],
})
export class AppModule {
}
