import { Controller } from '@nestjs/common';
import { HelpService } from './help.service';

@Controller('help')
export class HelpController {
    constructor(private readonly helpService: HelpService) {}
}
