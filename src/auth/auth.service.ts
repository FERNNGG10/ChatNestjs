import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { createHash } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async validateUser({email,password}:AuthUserDto) {
        const user = await this.usersService.findOneByEmail(email);
        const hash = createHash('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        if (user && user.password === hashedPassword) {
           return this.jwtService.signAsync({id: user.id,email: user.email});
        }
        return null;
    }

    async register (createUserDto:CreateUserDto){
        return await this.usersService.create(createUserDto);
        
    }
}
