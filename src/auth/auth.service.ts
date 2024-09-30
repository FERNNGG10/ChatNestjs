import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { createHash } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private emailService: EmailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async validateUser({ email, password }: AuthUserDto) {
    const user = await this.usersService.findOneByEmail(email);
    const hash = createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    if (user && user.password === hashedPassword) {
      await this.generateVerificationCode(user.id);
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async generateVerificationCode(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (user) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      user.code = await bcrypt.hash(code, await bcrypt.genSalt());
      await this.usersService.update(user.id, user);
      await this.emailService.sendMail(user.email, 'Your code', {
        name: user.username,
        code: code,
      });
      return true;
    }
    throw new UnauthorizedException('User not found');
  }

  async verifyCode(userId: number, code: string) {
    const user = await this.usersService.findOne(userId);
    if (user && (await bcrypt.compare(code, user.code))) {
      const token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });
      return { token: token };
    }
    throw new UnauthorizedException('Invalid Code');
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async send() {
    // await this.emailService.sendMail('fgolmos10@gmail.com', 'hola', {
    //   name: 'Fernando',
    // });
    return true;
  }
}
