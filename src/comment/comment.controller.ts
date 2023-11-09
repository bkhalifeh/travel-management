import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Response } from 'express';
import {
    CommentManagement,
    CreateTravelRoles,
    Role,
    UserManagementRoles,
} from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UtilService } from 'src/util/util.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('create')
    async createComment(
        @Body() createCommentDto: CreateCommentDto,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.commentService.create(req.user, createCommentDto);
        res.redirect(`/travel/${createCommentDto.travelId}`);
    }

    // @Get('management')
    // async managementGet(@Req() req, @Res() res: Response) {
    //     const userRole: Role = req.user.role;
    //     let myCommentCount = 0;
    //     let trashCommentCount = 0;
    //     let unVerifyCommentCount = 0;
    //     const unVerifiedComments = (
    //         await Promise.all(
    //             (
    //                 await this.commentService.findAll()
    //             ).map(async (v) => {
    //                 const o = await v.populate('author');
    //                 return o.populate('travel');
    //             }),
    //         )
    //     ).filter((c) => {
    //         //--------------
    //         if (
    //             !c.isVerified &&
    //             ([Role.SystemManager, Role.CollegeManager].includes(userRole) ||
    //                 ([
    //                     Role.ComputerGroupManager,
    //                     Role.ComputerForumAdmin,
    //                     Role.ComputerForumMember,
    //                 ].includes(userRole) &&
    //                     c.author.field === 'کامپیوتر') ||
    //                 ([
    //                     Role.IndustryGroupManager,
    //                     Role.IndustryForumAdmin,
    //                     Role.IndustryForumMember,
    //                 ].includes(userRole) &&
    //                     c.author.field === 'صنایع'))
    //         ) {
    //             // if (c.inTrash) trashCommentCount += 1;
    //             // else unVerifyCommentCount += 1;
    //             return c;
    //         }
    //         // else if (c.author._id.toString() === req.user.id) {
    //         //     myCommentCount += 1;
    //         //     return c;
    //         // }
    //     });
    //     console.log(unVerifiedComments);
    //     res.render('comment/management', {
    //         user: req.user,
    //         asideMenu: 'management',
    //         asideSubMenu: 'comment-management',
    //         comments: unVerifiedComments,
    //         CommentManagement,
    //         CreateTravelRoles,
    //         UserManagementRoles,
    //         customeFormatTime: UtilService.customeFormatTime,
    //         myCommentCount,
    //         trashCommentCount,
    //         unVerifyCommentCount,
    //     });
    // }

    @Get('manage-comment')
    async manageCommentGet(@Req() req, @Res() res: Response) {
        const userRole: Role = req.user.role;
        let myCommentCount = 0;
        let trashCommentCount = 0;
        let unVerifyCommentCount = 0;
        const comments = (
            await Promise.all(
                (
                    await this.commentService.findAll()
                ).map(async (v) => {
                    const o = await v.populate('author');
                    return o.populate('travel');
                }),
            )
        ).filter((c) => {
            //--------------
            if (
                req.user.id !== c.author._id.toString() &&
                ([Role.SystemManager, Role.CollegeManager].includes(userRole) ||
                    ([
                        Role.ComputerGroupManager,
                        Role.ComputerForumAdmin,
                        Role.ComputerForumMember,
                    ].includes(userRole) &&
                        c.author.field === 'کامپیوتر') ||
                    ([
                        Role.IndustryGroupManager,
                        Role.IndustryForumAdmin,
                        Role.IndustryForumMember,
                    ].includes(userRole) &&
                        c.author.field === 'صنایع'))
            ) {
                return c;
            }
        });
        res.render('comment/manage-comment', {
            user: req.user,
            asideMenu: 'comment-management',
            asideComment: 'manage-comment',
            notices: comments,
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,

            customeFormatTime: UtilService.customeFormatTime,
        });
    }

    @Get('mycomment')
    async mycommentGet(@Req() req, @Res() res: Response) {
        const comments = await this.commentService.findByAuthor(req.user.id);
        res.render('comment/mycomment', {
            user: req.user,
            asideMenu: 'comment',
            asideComment: 'mycomment',
            notices: comments,
            CreateTravelRoles,
            CommentManagement,
            UserManagementRoles,
            customeFormatTime: UtilService.customeFormatTime,
        });
    }

    @Get('trash/:id')
    @Roles(...CommentManagement)
    async moveToTrash(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        await this.commentService.moveToTrash(id);
        res.redirect('/comment/management');
    }

    @Get('restore/:id')
    @Roles(...CommentManagement)
    async restoreFromTrash() {}

    @Get('delete/:id')
    @Roles(...CommentManagement)
    async deleteComment(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const comment = await (
            await this.commentService.findOne(id)
        ).populate('travel');
        const travel = await comment.travel.populate('manager');
        if (
            // travel.manager._id.toString() === req.user.id ||
            [Role.SystemManager, Role.CollegeManager].includes(req.user.role) ||
            (travel.manager.role === Role.ComputerForumAdmin &&
                req.user.role === Role.ComputerGroupManager) ||
            (travel.manager.role === Role.IndustryForumAdmin &&
                req.user.role === Role.IndustryGroupManager)
        ) {
            await this.commentService.delete(id);
            res.redirect('/comment/manage-comment');
        } else {
            throw new ForbiddenException();
        }

        //const unVerifiedComments = await Promise.all((await this.commentService.findNotVerified()).map(v => v.populate('author')));
        // res.render('comment/management', { user: req.user, asideMenu: 'management', asideSubMenu: 'comment-management', comments: unVerifiedComments });
        // res.redirect('/comment/management');
    }

    @Get('verified/:id')
    @Roles(...CommentManagement)
    async verifiedComment(
        @Param('id') id: string,
        @Req() req,
        @Res() res: Response,
    ) {
        const comment = await (
            await this.commentService.findOne(id)
        ).populate('travel');
        const travel = await comment.travel.populate('manager');
        if (
            travel.manager._id.toString() === req.user.id ||
            [Role.SystemManager, Role.CollegeManager].includes(req.user.role) ||
            (travel.manager.role === Role.ComputerForumAdmin &&
                req.user.role === Role.ComputerGroupManager) ||
            (travel.manager.role === Role.IndustryForumAdmin &&
                req.user.role === Role.IndustryGroupManager)
        ) {
            await this.commentService.verified(id);
            res.redirect('/comment/manage-comment');
        } else {
            throw new ForbiddenException();
        }
        //const unVerifiedComments = await Promise.all((await this.commentService.findNotVerified()).map(v => v.populate('author')));
        //res.render('comment/management', { user: req.user, asideMenu: 'management', asideSubMenu: 'comment-management', comments: unVerifiedComments });
    }

    @Get('edit/:id')
    editComment() {
        
    }
}
