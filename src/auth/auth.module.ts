import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtEstrategy } from './strategies/jwt.strategy';


@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:'jwtsecret8@g',
      signOptions: { expiresIn: '1h' }, 
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtEstrategy],
  exports:[JwtModule]
})
export class AuthModule {}
