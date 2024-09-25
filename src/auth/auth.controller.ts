import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({type:AuthUserDto})
    @HttpCode(HttpStatus.OK)
    login(@Req() req: Request){
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
