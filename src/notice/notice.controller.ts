import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { Response } from 'express';
import {
    CreateTravelRoles,
    CommentManagement,
    UserManagementRoles,
    NoitceManagement,
} from 'src/auth/enums/role.enum';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UtilService } from 'src/util/util.service';
import { DeleteNoticeDto } from './dto/delete-notice.dto';
import { ReadNoticeDto } from './dto/read-notice.dto';
import { Roles } from 'src/auth/decorators/role.decorator';

@UseGuards(AuthenticatedGuard)
@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Get('readed')
    async readedGet(@Req() req, @Res() res: Response) {
        const notices = await this.noticeService.findReadedNotice(req.user.id);
        res.render('notice/readed.pug', {
            user: req.user,
            asideMenu: 'notice',
            asideNotice: 'readed',
            notices,
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,
            NoitceManagement,
            customeFormatTime: UtilService.customeFormatTime,
        });
    }

    @Get('unreaded')
    async unreadedGet(@Req() req, @Res() res: Response) {
        const notices = await this.noticeService.findUnReadedNotice(
            req.user.id,
        );
        res.render('notice/unreaded.pug', {
            user: req.user,
            asideMenu: 'notice',
            asideNotice: 'unreaded',
            notices,
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,
            NoitceManagement,
            customeFormatTime: UtilService.customeFormatTime,
        });
    }

    // @Get('management')
    // async managementGet(@Req() req, @Res() res: Response) {
    //     const notices = await this.noticeService.findAll();
    //     res.render('notice/management.pug', {
    //         user: req.user,
    //         asideMenu: 'notice',
    //         asideNotice: 'management',
    //         notices,
    //         CreateTravelRoles,
    //         CommentManagement,
    //         UserManagementRoles,
    //         NoitceManagement,
    //         customeFormatTime: UtilService.customeFormatTime,
    //     });
    // }

    @Get('read/:id')
    async readNotice(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.noticeService.read([id]);
        res.redirect('/notice/unreaded');
    }
    @Patch('read')
    async readNotices(
        @Body() readNoticeDto: ReadNoticeDto,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.noticeService.read(readNoticeDto.ids);
        res.redirect('/notice/unreaded');
    }

    @Get('delete/:id')
    async deleteNotice(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.noticeService.delete([id]);
        res.redirect('/notice/unreaded');
    }
    @Delete('delete')
    async deleteNotices(
        @Body() deleteNoticeDto: DeleteNoticeDto,
        @Req() req,
        @Res() res: Response,
    ) {
        console.log(deleteNoticeDto.ids);
        await this.noticeService.delete(deleteNoticeDto.ids);
        res.redirect('/notice/unreaded');
    }

    @Post()
    @Roles(...NoitceManagement)
    async createNotice(
        @Body() createNoticeDto: CreateNoticeDto,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.noticeService.create(req.user.id, createNoticeDto);
        res.redirect('/notice/unreaded');
    }

    @Get('work')
    async work(@Req() req) {
        // await this.noticeService.create();
        // return 'done';
        // return this.noticeService.findUnReadedNotice(req.user.id);
        this.noticeService.work();
    }
}
