import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback,Profile} from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    // console.log(profile);
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log({ profile });
    // console.log({ accessToken, refreshToken });
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      username: profile.displayName,
      password: '',
    });
    //console.log(user);
    done(null, user);
  }
}