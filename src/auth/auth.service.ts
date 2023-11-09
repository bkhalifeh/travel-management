import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { hash, verify } from 'argon2';
import { UserSession } from './types/user.session';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import {
    EmailVerify,
    EmailVerifyDocument,
} from './schemas/email.verify.schema';
import {
    ForgotPassword,
    ForgotPasswordDocument,
} from './schemas/forgot.password.schema';
import { ResetPasswordAuthDto } from './dtos/reset.password-auth.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(EmailVerify.name)
        private readonly emailVerifyModel: Model<EmailVerifyDocument>,
        @InjectModel(ForgotPassword.name)
        private readonly forgotPasswordModel: Model<ForgotPasswordDocument>,
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    async findEmailVCode(token: string) {
        const e = await this.emailVerifyModel.findOne({ token });
        return e.email;
    }

    async validateUser(email: string, password: string): Promise<UserSession> {
        const user = await this.userService.findOneByEmail(email);
        if (user && (await verify(user.password, password))) {
            //const { password, isEmailVerified, ...res } = user;
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                gendere: user.gendere,
                profile: user.profile,
                role: user.role,

                studentId: user.studentId,
                entryYear: user.entryYear,
                field: user.field,
            };
        }
        return null;
    }

    async sendVerifyEmail(email: string) {
        let emailVerify = await this.emailVerifyModel.findOne({ email });
        if (
            emailVerify &&
            (new Date().getTime() - emailVerify.timestamp.getTime()) / 60000 < 2
        ) {
            throw new ForbiddenException([
                'A confirmation email has recently been sent.',
            ]);
        } else {
            if (emailVerify) {
                emailVerify.token = randomUUID();
                emailVerify.timestamp = new Date();
            } else {
                emailVerify = await this.emailVerifyModel.create({
                    email,
                    token: randomUUID(),
                    timestamp: new Date(),
                });
            }
            await emailVerify.save();
            try {
                this.mailService.sendVerifyEmail(email, emailVerify.token);
            } catch (e) {
                console.log(e);
                throw new HttpException(
                    'Can not send verification email.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    async registerUser(registerAuthDto: RegisterAuthDto) {
        const { repeatPassword, ...createUser } = registerAuthDto;
        if (repeatPassword === createUser.password) {
            createUser.password = await hash(createUser.password);
            // const newUser = await this.userService.create({
            //     ...createUser,
            //     role: Role.Member
            // });
            // return newUser.email;
        }
        return null;
    }

    async forgotPassword(email: string) {
        let forgotPassword = await this.forgotPasswordModel.findOne({ email });
        if (
            forgotPassword &&
            (new Date().getTime() - forgotPassword.timestamp.getTime()) /
                60000 <
                2
        ) {
            throw new ForbiddenException([
                'A confirmation email has recently been sent.',
            ]);
        } else {
            if (forgotPassword) {
                forgotPassword.token = randomUUID();
                forgotPassword.timestamp = new Date();
            } else {
                forgotPassword = await this.emailVerifyModel.create({
                    email,
                    token: randomUUID(),
                    timestamp: new Date(),
                });
            }
            await forgotPassword.save();
            try {
                this.mailService.sendForgotPassword(
                    email,
                    forgotPassword.token,
                );
            } catch (e) {
                console.log(e);
                throw new HttpException(
                    'Can not send verification email.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    async resetPassword(
        token: string,
        resetPasswordAuthDto: ResetPasswordAuthDto,
    ) {
        const forgotPassword = await this.forgotPasswordModel.findOne({
            token,
        });
        if (
            forgotPassword &&
            resetPasswordAuthDto.password ==
                resetPasswordAuthDto.confirmPassword
        ) {
            const user = await this.userService.findOneByEmail(
                forgotPassword.email,
            );
            user.password = await hash(resetPasswordAuthDto.password);
            user.save();
            forgotPassword.deleteOne();
            return { message: 'password changed' };
        }
    }

    async verify(token: string) {
        const emailVerify = await this.emailVerifyModel.findOne({ token });
        if (emailVerify) {
            const user = await this.userService.findOneByEmail(
                emailVerify.email,
            );
            user.isEmailVerified = true;
            user.save();
            emailVerify.deleteOne();
            return { message: 'email succssful verified' };
        }
    }
}
