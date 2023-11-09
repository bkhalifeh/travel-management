import { Role } from '../enums/role.enum';

export class RegisterAuthDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gendere: string;
    password: string;
    repeatPassword: string;
    role: Role;

    studentId?: string;
    entryYear?: string;
    field?: string;
}
