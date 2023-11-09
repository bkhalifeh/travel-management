import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(req, usernameOrEmail: string, password: string) {
        const user = await this.authService.validateUser(
            usernameOrEmail,
            password,
        );
        if (user) {
            console.log(user);
            return user;
        }
        // const res: Response = req.res;
        // res.render('login', { err: 'نام کاربری یا رمز عبور اشتباه است' });
    }
}
