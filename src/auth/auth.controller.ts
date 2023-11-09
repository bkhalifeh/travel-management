import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { LocalGuard } from './guards/local.guard';
import { ForgotPasswordAuthDto } from './dtos/forgot.password-auth.dto';
import { ResetPasswordAuthDto } from './dtos/reset.password-auth.dto';
import { AppConfigService } from 'src/app-config/app-config.service';
import { Role } from './enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService,
    ) {}

    @Get('login')
    loginGet(@Res() res: Response) {
        res.render('auth/login');
    }
    @UseGuards(LocalGuard)
    @Post('login')
    loginPost(@Res() res: Response) {
        res.redirect('/');
    }

    @Get('register')
    registerGet(@Res() res: Response) {
        res.render('auth/register', {
            entryYears: AppConfigService.ENTRY_YEARS,
            fields: AppConfigService.FIELDS,
            roles: Role,
        });
    }

    // @UseFilters(RegisterValidateFilter)
    @Post('register')
    async registerPost(
        @Body() registerAuthDto: RegisterAuthDto,
        @Res() res: Response,
    ) {
        const s = await this.authService.registerUser(registerAuthDto);
        if (s) {
            this.authService.sendVerifyEmail(s);
        }
        res.render('auth/verify', { email: registerAuthDto.email });
    }

    @Get('resend-verify/:email')
    resendVerifyGet(@Param('email') email: string) {
        this.authService.sendVerifyEmail(email);
    }

    @Get('forgot-password')
    forgotPasswordGet(@Res() res: Response) {
        res.render('auth/forgot-password');
    }
    @Post('forgot-password')
    forgotPasswordPost(forgotPasswordAuthDto: ForgotPasswordAuthDto) {
        this.authService.forgotPassword(forgotPasswordAuthDto.email);
    }

    @Get('reset-password/:token')
    async resetPasswordGet(@Res() res: Response, @Param('token') token: string) {
        const email = await this.authService.findEmailVCode(token)
        res.render('auth/reset-password', { email });
    }
    @Post('reset-password/:token')
    resetPasswordPost(
        @Param('token') token: string,
        resetPasswordAuthDto: ResetPasswordAuthDto,
        // @Res() res: Response,
    ) {
        return this.authService.resetPassword(token, resetPasswordAuthDto);
    }

    @Get('verify/:token')
    verifyGet(@Param('token') token: string, @Res() res: Response) {
        this.authService.verify(token);
        res.render('auth/verified-email');
    }

    @Get('logout')
    logoutGet(@Req() req, @Res() res: Response) {
        req.session.destroy();
        res.redirect('/auth/login');
    }
}
