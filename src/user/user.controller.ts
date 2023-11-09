import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import {
    CommentManagement,
    CreateTravelRoles,
    CreateUserRoles,
    Role,
    StudentRoles,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';
import { AppConfigService } from 'src/app-config/app-config.service';
import { RegisterAuthDto } from 'src/auth/dtos/register-auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserSession } from 'src/auth/types/user.session';
import { UserFetch } from './types/user.fetch';
import { UserDocument } from './schemas/user.schema';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { ManualCreateUserDto } from './dto/create-user.dto';
import { UtilService } from 'src/util/util.service';
import { hash } from 'argon2';
import { classToClassFromExist } from 'class-transformer';
import { ManualUpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService, // , private readonly authService: AuthService
    ) {}

    @Get('delete/:id')
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        await this.userService.deleteOne(id);
        res.redirect('/user/management');
    }

    @Get()
    @Roles(...UserManagementRoles)
    async userGet(@Req() req) {
        const userModel = this.userService.userModel;
        let users: UserDocument[] = await this.userService.findAllByRole(
            req.user.role,
        );
        const data = users
            .map((v) => {
                return {
                    id: v._id.toString(),
                    full_name: `${v.firstName} ${v.lastName}`,
                    role: v.role,
                    email: v.email,
                    avatar: v.profile,
                };
            })
            .filter((v) => v.id.toString() !== req.user.id);
        // .sort((a, b) => {
        //     if (
        //         UtilService.roleScore(a.role) ===
        //         UtilService.roleScore(b.role)
        //     )
        //         return 0;
        //     else if (
        //         UtilService.roleScore(a.role) >
        //         UtilService.roleScore(b.role)
        //     )
        //         return 1;
        //     else return -1;
        // });
        return { data };
    }

    @Post()
    async createUser(
        @Body() manualCreateUserDto: ManualCreateUserDto,
        @Res() res: Response,
    ) {
        const { repeatPassword, password, ...cu } = manualCreateUserDto;
        await new this.userService.userModel({
            profile: UtilService.randomProfile(cu.gendere),
            password: await hash(password),
            ...cu,
        }).save();
        // const em = await this.authService.registerUser(registerAuthDto);
        // const user = await this.userService.findOneByEmail(em);
        // user.isEmailVerified = true;
        // await user.save();
        // res.redirect('/user/management');
    }

    @Post('update/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() manualUpdateUserDto: ManualUpdateUserDto,
        @Res() res: Response,
    ) {
        await this.userService.updateOne(id, manualUpdateUserDto);
        res.redirect('/user/management');
    }

    @Post('management')
    async printBody(
        @Body() manualCreateUserDto: ManualCreateUserDto,
        @Res() res: Response,
    ) {
        const { repeatPassword, password, ...cu } = manualCreateUserDto;
        await new this.userService.userModel({
            profile: UtilService.randomProfile(cu.gendere),
            password: await hash(password),
            ...cu,
        }).save();
        res.redirect('/user/management');
    }

    @Get('management')
    @Roles(...UserManagementRoles)
    async managementGet(@Req() req, @Res() res: Response) {
        const users: UserDocument[] = await this.userService.findAllByRole(
            req.user.role,
        );

        const findedUsers = await this.userService.findAll();
        res.render('user/management', {
            user: req.user,
            asideMenu: 'management',
            asideSubMenu: 'user-management',
            findedUsers,
            entryYears: AppConfigService.ENTRY_YEARS,
            fields: AppConfigService.FIELDS,
            CreateUserRoles,
            StudentRoles,
            users,
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
        });
    }

    @Get('work')
    async workGet() {
        this.userService.work();
    }
}
