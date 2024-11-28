import { Response } from 'express';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleLogin(): {
        msj: string;
    };
    googleAuthCallback(req: any, res: Response): Promise<void>;
    verify(body: VerifyCodeDto): Promise<{
        token: string;
    }>;
    login(req: Request): Express.User;
    register(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    profile(req: Request): Express.User;
}
