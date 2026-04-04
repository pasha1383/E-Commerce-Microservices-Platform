import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

export class SignupDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}