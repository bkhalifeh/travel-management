import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notice.name, schema: NoticeSchema },
        ]),
        UserModule,
    ],
    controllers: [NoticeController],
    providers: [NoticeService],
    exports: [NoticeService],
})
export class NoticeModule {}
