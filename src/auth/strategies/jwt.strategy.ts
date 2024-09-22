import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";

export class JwtEstrategy extends PassportStrategy(Strategy){
    constructor(
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'jwtsecret8@g',

        })
    }

    validate(payload:any){
    //    console.log('inside jwt strategy')
    //    console.log(payload)
       return payload;
    }
}