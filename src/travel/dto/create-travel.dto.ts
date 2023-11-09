import { MemoryStoredFile } from 'nestjs-form-data';

export class CreateTravelDto {
    title: string;
    image: MemoryStoredFile;
    caption: string;
    location: string;
    price: number;
    capacity: number;
    insurance: string;
    duration: string;
    residence: string;
    transportation: string;
    meals: string;
    services: string;
    itemsNeeded: string;
}
