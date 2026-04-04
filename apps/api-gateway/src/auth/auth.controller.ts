import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';
import {SignupDto} from "./dto/signup.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private proxyService: ProxyService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.proxyService.forward('POST', '/auth/signup', signupDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.proxyService.forward('POST', '/auth/login', loginDto);
    }
}