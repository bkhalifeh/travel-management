import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import util from 'util';
// import { pugEngine } from 'nodemailer-pug-engine';

@Injectable()
export class MailService {
    transporter: Transporter;
    companyEmail: string;
    verifyTemplate: string;
    forgotPasswordTemplate: string;

    constructor(private readonly configService: ConfigService) {
        this.companyEmail = this.configService.get<string>('EMAIL_USER');
        this.transporter = createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.companyEmail,
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
            socketTimeout: 120000,
        });
        this.verifyTemplate = `<a href="http://${this.configService.get<string>(
            'APP_HOST',
        )}:${this.configService.get<number>(
            'APP_PORT',
        )}/auth/verify/%s">verify</a>`;

        this.forgotPasswordTemplate = `<a href="http://${this.configService.get<string>(
            'APP_HOST',
        )}:${this.configService.get<number>(
            'APP_PORT',
        )}/auth/reset-password/%s">reset</a>`;
    }

    async sendVerifyEmail(email: string, token: string) {
        return this.transporter.sendMail({
            from: this.companyEmail,
            to: email,
            subject: 'Verify Acount',
            html: util.format(this.verifyTemplate, token),
        });
    }

    async sendForgotPassword(email: string, token: string) {
        return this.transporter.sendMail({
            from: this.companyEmail,
            to: email,
            subject: 'Reset Password',
            html: util.format(this.forgotPasswordTemplate, token),
        });
    }

    // findOneEmailVerify(token: string) {
    //     return this.emailVerifyModel.findOne({ token });
    // }
    // removeEmailVerify(id: number) {
    //     return this.emailVerifyModel.deleteOne({ id });
    // }
}
