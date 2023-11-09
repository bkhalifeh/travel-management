import { MemoryStoredFile } from 'nestjs-form-data';

export class ChangeAccountDto {
    profile: MemoryStoredFile;
    phoneNumber: string;
    email: string;
}
