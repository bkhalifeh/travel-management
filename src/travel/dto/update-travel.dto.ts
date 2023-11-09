import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelDto } from './create-travel.dto';

export class UpdateTravelDto {
    title?: string;
    caption?: string;
    location?: string;
    price?: number;
    capacity?: number;
    insurance?: string;
    duration?: string;
    residence?: string;
    transportation?: string;
    meals?: string;
    services?: string;
    itemsNeeded?: string;
}
