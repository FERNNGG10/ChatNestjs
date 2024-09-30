import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { GoogleGuard } from './guards/google/google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Get('google/login')
  @UseGuards(GoogleGuard)
  googleLogin() {
    return {msj:'Redirecting to google...'};
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const user = req.user;
    
    console.log(user.username);
    await this.authService.googleLogin(user.id);
    res.redirect('http://localhost:3000/docs#/default/AuthController_register')
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: VerifyCodeDto })
  async verify(@Body() body: VerifyCodeDto) {
    return this.authService.verifyCode(body.userId, body.code);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: AuthUserDto })
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@Req() req: Request) {
    return req.user;
  }
}