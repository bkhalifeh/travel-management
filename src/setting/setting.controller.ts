import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    UseGuards,
    Req,
} from '@nestjs/common';
import { SettingService } from './setting.service';

import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { ChangeAccountDto } from './dto/change.account.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import {
    CommentManagement,
    CreateTravelRoles,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';

@UseGuards(AuthenticatedGuard)
@Controller('setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @Get('account')
    accountGet(@Req() req, @Res() res: Response) {
        console.log(req.user);
        res.render('setting/account', {
            user: req.user,
            asideMenu: 'setting',
            asideSubMenu: 'account',
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
        });
    }
    @Post('account')
    @FormDataRequest({ storage: MemoryStoredFile })
    accountPost(
        @Body() changeAccountDto: ChangeAccountDto,
        @Req() req,
        @Res() res: Response,
    ) {
        this.settingService.changeUserAccount(req, changeAccountDto);
        req.logIn(req.user, function (error) {
            if (error) throw error;
            console.log('FUCK');
            res.redirect('/');
        });
    }

    @Get('security')
    securityGet(@Req() req, @Res() res: Response) {
        res.render('setting/security', {
            user: req.user,
            asideMenu: 'setting',
            asideSubMenu: 'security',
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
        });
    }
    @Post('security')
    securityPost(
        @Body() changePasswordDto: ChangePasswordDto,
        @Req() req,
        @Res() res: Response,
    ) {
        this.settingService.changeUserPassword(req.user.id, changePasswordDto);
        res.redirect('/');
    }
}
