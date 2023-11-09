import { Controller, Get, Req, Res } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import {
    CommentManagement,
    CreateTravelRoles,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';

@Controller('invoice')
export class InvoiceController {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly userService: UserService,
    ) {}

    @Get()
    async invoiceGet(@Req() req, @Res() res: Response) {
        const userTravels = await (
            await this.userService.findOneById(req.user.id)
        ).populate('travels');
        const totalPrices = userTravels.travels.reduce(
            (total, travel) => total + travel.price,
            0,
        );
        res.render('invoice/invoice', {
            user: req.user,
            asideMenu: 'invoice',
            userTravels,
            totalPrices,
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
        });
    }
}
