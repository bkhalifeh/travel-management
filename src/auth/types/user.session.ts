import { Travel } from 'src/travel/schemas/travel.schema';
import { Role } from '../enums/role.enum';

export class UserSession {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gendere: string;
    profile: string;

    studentId?: string;
    entryYear?: string;
    field?: string;

    role: Role;
}
