import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from './schemas/travel.schema';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Travel.name, schema: TravelSchema },
        ]),
        UserModule,
        CommentModule,
    ],
    controllers: [TravelController],
    providers: [TravelService],
    exports: [TravelService],
})
export class TravelModule {}
