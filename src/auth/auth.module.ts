import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './providers/session.serializer';
import { LocalStrategy } from './providers/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailVerify, EmailVerifySchema } from './schemas/email.verify.schema';
import {
    ForgotPassword,
    ForgotPasswordSchema,
} from './schemas/forgot.password.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: EmailVerify.name, schema: EmailVerifySchema },
            { name: ForgotPassword.name, schema: ForgotPasswordSchema },
        ]),
        PassportModule,
        UserModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    exports: [AuthService],
})
export class AuthModule {}
