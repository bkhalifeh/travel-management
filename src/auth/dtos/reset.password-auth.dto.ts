import { IsStrongPassword } from 'class-validator';

export class ResetPasswordAuthDto {
    @IsStrongPassword()
    password: string;

    @IsStrongPassword()
    confirmPassword: string;
}
