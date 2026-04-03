import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(
        @Body('email') email: string,
        @Body('password') password: string,
    ){
        return this.authService.signup(email, password);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ){
        const user = await this.authService.validateUser(email, password);
        return this.authService.login(user);
    }
}
