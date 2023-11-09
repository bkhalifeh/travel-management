import { IsEmail } from 'class-validator';

export class ForgotPasswordAuthDto {
    @IsEmail()
    email: string;
}
