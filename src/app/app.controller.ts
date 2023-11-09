import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { Response } from 'express';
import { TravelService } from '../travel/travel.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly travelService: TravelService,
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    async getHello(
        @Req() req,
        @Res() res: Response /*@Query('show') show: string*/,
    ) {
        // // return this.appService.getHello(req.user.username)
        // const arr = await this.travelService.findAll();
        // // const travels = [];
        // // for (let i = 0; i < arr.length; i += 3) {
        // //     travels.push(arr.slice(i, i + 3));
        // // }
        // res.render('travel/travels', { asideActive: 'travels', travels: arr });
        res.redirect('/travel');
    }
}
