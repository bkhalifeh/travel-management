import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class RegisterValidateFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const errs: string[] = (exception.getResponse() as any).message;
        const res = host.switchToHttp().getResponse<Response>();
        const context = {
            isValidate: true,
            isValidUsername: true,
            isValidEmail: true,
            isValidPassword: true,
        };
        if (errs.includes('username')) {
            context['isValidUsername'] = false;
            context['errUsername'] =
                'نام کاربری باید با حروف شروع شود و فقط حروف انگلیسی و اعداد مجاز است';
        }
        if (errs.includes('email')) {
            context['isValidEmail'] = false;
            context['errEmail'] = 'ایمیلی که شما وارد کرده اید اشتباه است';
        }
        if (errs.includes('password')) {
            context['isValidPassword'] = false;
            context['errPassword'] =
                'رمز عبور باید از حروف بزرگ و کوچک و اعداد و حروف خاص تشکیل شده باشد';
        }
        res.render('auth/register', context);
    }
}
