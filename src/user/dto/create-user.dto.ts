import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    studentId: string;
    entryYear: string;
    field: string;
    gendere: string;
    email: string;
    password: string;
    role: Role;
    // profile: string;
}

export class ManualCreateUserDto {
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
