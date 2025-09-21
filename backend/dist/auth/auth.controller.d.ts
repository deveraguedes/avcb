import { AuthService, LoginDto, RegisterDto } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
