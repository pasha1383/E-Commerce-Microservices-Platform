import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {Role} from "../common/enums/role.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private jwtService : JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const {password, ...result} = user
            return result;
        }
        throw new UnauthorizedException("Invalid credentials");
    }

    async login(user:any) {
        const payload = {sub : user.id, email: user.email, password: user.password}
        return {
            access_token : this.jwtService.sign(payload)
        }
    }

    async signup(email: string, password: string,role : Role =  Role.USER) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new UnauthorizedException("Email already exists");
        }

        const user = await this.userService.create(email, password,role);
        const {password: _, ...result} = user;
        return result;
    }
}
