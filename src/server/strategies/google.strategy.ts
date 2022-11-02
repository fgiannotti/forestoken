import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserGoogle } from '../../shared/types/UserGoogle';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.HOST + 'auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('refreshToken');
    console.log(refreshToken);
    const user: UserGoogle = {
      mail: profile.emails[0].value,
      displayName: profile.displayName,
      photoUrl: profile.photos[0].value,
      accessToken: accessToken,
    };
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
