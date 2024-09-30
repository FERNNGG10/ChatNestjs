import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtEstrategy } from './strategies/jwt.strategy';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';



@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:'jwtsecret8@g',
      signOptions: { expiresIn: '1h' }, 
    }),
    UsersModule,
    EmailModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtEstrategy],
  exports:[JwtModule]
})
export class AuthModule {}
