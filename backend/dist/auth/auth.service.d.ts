import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export interface LoginDto {
    email: string;
    password: string;
}
export interface RegisterDto {
    email: string;
    name: string;
    password: string;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            name: string;
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
