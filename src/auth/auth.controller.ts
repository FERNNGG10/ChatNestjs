import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('send')
    send(){
        return this.authService.send();
    }
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: VerifyCodeDto })
    async verify(@Body() body: VerifyCodeDto) {
        return this.authService.verifyCode(body.userId, body.code);
    }


    // @Get('google')
    // @UseGuards(AuthGuard('google'))
    // async googleAuth(@Req() req) {
    //     // Inicia el flujo de autenticación de Google
    // }
  
    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // async googleAuthRedirect(@Req() req, @Res() res) {
    //     // Aquí es donde Google redirige después de la autenticación
    //     const user = req.user;
    //     console.log(user);
    // }



    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: AuthUserDto })
    @HttpCode(HttpStatus.OK)
    login(@Req() req: Request) {
        return req.user;
    }


    @Post('register')
    register(@Body() CreateUserDto:CreateUserDto){
        return this.authService.register(CreateUserDto);
    }

    @ApiBearerAuth()
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@Req() req:Request){
        //console.log(req.user);
        return req.user;
    }

    
    

}
