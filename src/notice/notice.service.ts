import { Injectable } from '@nestjs/common';
import { Notice, NoticeDocument } from './schemas/notice.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Injectable()
export class NoticeService {
    constructor(
        @InjectModel(Notice.name)
        private readonly noticeModel: Model<NoticeDocument>,
        private readonly userService: UserService,
    ) {}

    findAll() {
        return this.noticeModel.find();
    }

    read(ids: string[]) {
        return this.noticeModel
            .updateMany(
                {
                    _id: {
                        $in: ids,
                    },
                },
                {
                    $set: {
                        isReaded: true,
                    },
                },
            )
            .exec();
    }

    delete(ids: string[]) {
        console.log(ids);
        return this.noticeModel
            .deleteMany({
                _id: {
                    $in: ids,
                },
            })
            .exec();
        // return this.noticeModel.findByIdAndRemove(id).exec();
    }

    async findUnReadedNotice(id: string) {
        // let user = await this.userService.findOneById(id);
        // user = await user.populate({
        //     path: 'notices',
        //     populate: { path: 'author', model: this.userService.userModel }
        // });
        // return user.notices;
        return this.noticeModel
            .find({
                reciver: id,
                isReaded: false,
            })
            .populate({ path: 'author', model: this.userService.userModel })
            .exec();
    }

    async findReadedNotice(id: string) {
        return this.noticeModel
            .find({
                reciver: id,
                isReaded: true,
            })
            .populate({ path: 'author', model: this.userService.userModel })
            .exec();
    }

    async work() {
        // const users = await this.userService.findAll();
        // users.forEach(async (user) => {
        //     user.notices.splice(0, user.notices.length);
        //     user.save();
        // });
    }

    async create(userId: string, createNoticeDto: CreateNoticeDto) {
        const users = await this.userService.findAll();
        const author = await this.userService.findOneById(userId);
        users.forEach(async (user) => {
            let newNotice = new this.noticeModel({
                author,
                reciver: user,
                ...createNoticeDto,
            });
            await newNotice.save();
            // user.notices.push(newNotice);
            // await user.save();
        });

        // const user = await this.userService.findOneByEmail('admin@gmail.com');
        // new this.noticeModel({
        //     title: 'اردو جدید',
        //     content:
        //         'لورم اپیسوم لورم اپیسوم لورم اپیسوم لورم اپیسوم ر لورم اپیسوملورم اپیسوملورم اپیسوم',
        //     author: user
        // }).save();
        // new this.noticeModel({
        //     title: ' نیمه اردو جدید',
        //     content:
        //         'لورم اپیسوم لورم اپیسوم لورم اپیسوم لورم اپیسوم ر لورم اپیسوملورم اپیسوملورم اپیسوم',
        //     author: user
        // }).save();
        // new this.noticeModel({
        //     title: 'اردو جدید اول',
        //     content:
        //         'لورم اپیسوم لورم اپیسوم لورم اپیسوم لورم اپیسوم ر لورم اپیسوملورم اپیسوملورم اپیسوم',
        //     author: user
        // }).save();

        // const notice = await this.noticeModel.findById('6533cbf5e499c3ade85c5447');
        // notice.readedNotice.push(user);
        // notice.save();
    }
}
