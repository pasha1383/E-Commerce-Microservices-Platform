import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('user')
export class UserController {
    constructor(private proxyService: ProxyService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        // req.user contains { userId, email, role } from JWT
        // Forward to user-service to get full profile (or just return from token)
        return this.proxyService.forward('GET', `/user/${req.user.userId}`);
    }
}