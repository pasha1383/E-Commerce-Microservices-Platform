import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {Role} from "../common/enums/role.enum";
import {UserResponseDto} from "./dto/user-response.dto";

@Injectable()
export class UserService {
    constructor(
        private prisma : PrismaService,
    ) {}

    async create(email: string, password: string,role:Role = Role.USER) {
        const hashedPassword = await bcrypt.hash(password,10);
        return this.prisma.user.create({
            data : {
                email,
                password: hashedPassword,
                role
            }
        })
    }
    async findById(id: number){
        const user = await this.prisma.user.findUnique({
            where: {id : id}
        });
        return user ? user : null;
    }
    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {email}
        });
        return user ? user : null;
    }

    private sanitizeUser(user: any) :  UserResponseDto {
        const {password, ...result} = user;
        return result as  UserResponseDto;
    }

}


