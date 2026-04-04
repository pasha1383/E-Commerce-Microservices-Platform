import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ProxyService} from './proxy/proxy.service';
import {ProxyModule} from './proxy/proxy.module';
import {UserController} from './user/user.controller';
import {UserModule} from './user/user.module';
import {ThrottlerModule} from "@nestjs/throttler";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => ([
                {
                    ttl: 60,
                    limit: 10,
                }
            ]),
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1d'},
            }),
        }),
        HttpModule,
        AuthModule,
        ProxyModule,
        UserModule
    ],
    controllers: [UserController],
    providers: [ProxyService],
})
export class AppModule {
}
