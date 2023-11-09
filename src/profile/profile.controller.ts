import { Controller, Get, Res, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import {
    CommentManagement,
    CreateTravelRoles,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly userService: UserService,
    ) {}

    @Get()
    async profileGet(@Req() req, @Res() res: Response) {
        const userTravels = await (
            await this.userService.findOneById(req.user.id)
        ).populate('travels');

        res.render('profile/profile', {
            user: req.user,
            asideMenu: 'profile',
            asideSubMenu: 'profile',
            userTravels,
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
        });
    }

    @Get('travels')
    async travelsGet(@Req() req, @Res() res: Response) {
        res.render('profile/travels', {
            user: req.user,
            asideMenu: 'profile',
            asideSubMenu: 'travels',
        });
    }
}
