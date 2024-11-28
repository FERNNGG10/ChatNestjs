import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GoogleUserDto } from 'src/users/dto/google-user.dto';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private jwtService;
    private usersService;
    private emailService;
    private readonly userRepository;
    constructor(jwtService: JwtService, usersService: UsersService, emailService: EmailService, userRepository: Repository<User>);
    validateUser({ email, password }: AuthUserDto): Promise<{
        id: number;
        email: string;
    }>;
    googleLogin(userId: number): Promise<{
        id: number;
        email: string;
    }>;
    generateVerificationCode(userId: number): Promise<boolean>;
    verifyCode(userId: number, code: string): Promise<{
        token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
    validateGoogleUser(googleUser: GoogleUserDto): Promise<User>;
}
