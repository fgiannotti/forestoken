import {Inject, Injectable, Res} from '@nestjs/common';
import {Response} from 'express';
import {PassportStrategy} from '@nestjs/passport';
import {Profile, Strategy} from 'passport-google-oauth20';
import {AuthService} from "../services/auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(refreshToken); // este devuelve undefined
        const user = await this.authService.validateUser({
            mail: profile.emails[0].value,
            photoUrl: profile.photos[0].value,
            accessToken: accessToken
        });
        console.log('Validate');
        console.log(user);
        return user || null;
    }
}