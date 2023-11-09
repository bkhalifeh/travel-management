import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Res,
    Req,
    UseGuards,
    Query,
    ForbiddenException,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { Response } from 'express';
import { CreateTravelDto } from './dto/create-travel.dto';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/admin/guards/is.admin.guard';
import { CommentService } from 'src/comment/comment.service';
import { UserService } from 'src/user/user.service';
import {
    CommentManagement,
    CreateTravelRoles,
    Role,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { formatDistanceToNow } from 'date-fns';
import { UtilService } from 'src/util/util.service';
import { UpdateTravelDto } from './dto/update-travel.dto';

@UseGuards(AuthenticatedGuard)
@Controller('travel')
export class TravelController {
    constructor(
        private readonly travelService: TravelService,
        private readonly commentService: CommentService,
        private readonly userService: UserService,
    ) {}

    @Get()
    async listTravels(
        @Query('show') show: string,
        @Req() req,
        @Res() res: Response,
    ) {
        let arr = await this.travelService.findAll();
        arr = await Promise.all(arr.map((t) => t.populate('manager')));
        //console.log(arr);
        if (show === 'registered') {
            arr = arr.filter((t) => {
                if (t.users.some((u) => u._id.toString() === req.user.id))
                    return t;
                return false;
            });
        }
        if (show === 'notregistered') {
            arr = arr.filter((t) => {
                if (t.users.every((u) => u._id.toString() !== req.user.id))
                    return t;
                return false;
                // t.users.every
            });
        }
        //console.log(arr);
        res.render('travel/travels', {
            user: req.user,
            travels: arr,
            asideMenu: 'travel',
            asideSubMenu: 'travel',
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,
            show,
            Role,
        });
    }

    @Get('create')
    @Roles(...CreateTravelRoles)
    createTravelGet(@Req() req, @Res() res: Response) {
        res.render('travel/create', {
            user: req.user,
            asideMenu: 'management',
            asideSubMenu: 'create-travel',
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
            isEdit: false,
            titleCE: 'ساخت اردو جدید',
        });
    }
    @Post('create')
    @Roles(...CreateTravelRoles)
    @FormDataRequest({ storage: MemoryStoredFile })
    async createTravelPost(
        @Body() createTravelDto: CreateTravelDto,
        @Req() req,
    ) {
        const travel = await this.travelService.create(
            req.user.id,
            createTravelDto,
        );
        return travel.id;
    }

    @Get('signup/:id')
    async signupTravelGet(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.travelService.signupUserIntoTravel(req.user.id, id);
        res.redirect(`/travel/${id}`);
    }
    @Get('signup-cancel/:id')
    async signupCancelGet(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.travelService.signupCancelUserFromTravel(req.user.id, id);
        res.redirect(req.headers.referer);
    }

    @Get('delete/:id')
    @Roles(...CreateTravelRoles)
    async deleteTravel(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.travelService.deleteById(id, req.user);
        res.redirect('/travel');
    }

    @Get('edit/:id')
    @Roles(...CreateTravelRoles)
    async editTravel(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const travel = await this.travelService.findOneById(id);
        res.render('travel/create', {
            user: req.user,
            isEdit: true,
            CommentManagement,
            CreateTravelRoles,
            UserManagementRoles,
            travel,
            titleCE: 'ویرایش اردو',
            Role,
        });
    }
    @Post('edit/:id')
    @Roles(...CreateTravelRoles)
    @FormDataRequest({ storage: MemoryStoredFile })
    async editTravelPost(
        @Param('id') id: string,
        @Body() updateTravelDto: UpdateTravelDto,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.travelService.edit(id, updateTravelDto);

        console.log(updateTravelDto.itemsNeeded);
        res.send(id);
    }

    @Get('list/:id')
    @Roles(...CreateTravelRoles)
    async listUsersGet(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const travel = await (
            await (await this.travelService.findOneById(id)).populate('manager')
        ).populate('users');
        if (
            travel.manager.role === req.user.role ||
            [Role.SystemManager, Role.CollegeManager].includes(req.user.role) ||
            (travel.manager.role === Role.ComputerForumAdmin &&
                req.user.role === Role.ComputerGroupManager) ||
            (travel.manager.role === Role.IndustryForumAdmin &&
                req.user.role === Role.IndustryGroupManager)
        ) {
            res.render('travel/list', {
                user: req.user,
                travel,
                CreateTravelRoles,
                CommentManagement,
                UserManagementRoles,
            });
        } else {
            throw new ForbiddenException();
        }
    }

    @Get('export/:id')
    @Roles(...CreateTravelRoles)
    async exportListUsersGet(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const travel = await (
            await this.travelService.findOneById(id)
        ).populate('manager');
        if (
            travel.manager.role === req.user.role ||
            [Role.SystemManager, Role.CollegeManager].includes(req.user.role) ||
            (travel.manager.role === Role.ComputerForumAdmin &&
                req.user.role === Role.ComputerGroupManager) ||
            (travel.manager.role === Role.IndustryForumAdmin &&
                req.user.role === Role.IndustryGroupManager)
        ) {
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=report.xlsx`,
            );
            res.setHeader('Content-Type', 'application/force-download');
            await this.travelService.exportExcel(id, res);
            res.end();
        } else {
            throw new ForbiddenException();
        }
    }

    @Get(':id')
    async singleTravelGet(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const travel = await this.travelService.findOneById(id);
        console.log(travel.capacity - travel.users.length);
        const isSignedUp = travel.users.some((v) => {
            return v._id.toString() === req.user.id;
        });
        const comments = await Promise.all(
            (
                await this.commentService.findManyByTravelId(id)
            ).map((c) => c.populate('author')),
        );
        //console.log(comments);
        res.render('travel/travel', {
            user: req.user,
            travel,
            isSignedUp,
            comments,
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,
            customeFormatTime: UtilService.customeFormatTime,
            Role,
        });
    }

    // @Post('upload-image')
    // @UseInterceptors(FileInterceptor('file'))
    // async uplodaImagePost(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Res() res: Response,
    // ) {

    // }
}
