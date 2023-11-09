import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TravelModule } from '../travel/travel.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongooseFactory } from '../factory/mongoose.factory';

import { join } from 'path';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { SettingModule } from '../setting/setting.module';
import { NoticeModule } from '../notice/notice.module';
import { HistoryModule } from '../history/history.module';
import { ChatModule } from '../chat/chat.module';
import { HelpModule } from '../help/help.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { CommentModule } from '../comment/comment.module';
import { UtilModule } from '../util/util.module';
import { ProfileModule } from '../profile/profile.module';
import { AdminModule } from '../admin/admin.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NotFoundFilter } from './filters/not.found.filter';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AppConfigModule,
        MongooseModule.forRootAsync({
            useFactory: mongooseFactory,
            inject: [ConfigService],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'static'),
            serveRoot: '/static',
        }),
        NestjsFormDataModule.config({
            storage: MemoryStoredFile,
            isGlobal: true,
        }),
        AuthModule,
        UserModule,
        MailModule,
        TravelModule,
        SettingModule,
        NoticeModule,
        HistoryModule,
        CommentModule,
        UtilModule,
        ProfileModule,
        AdminModule,
        InvoiceModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: NotFoundFilter,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AppService,
    ],
})
export class AppModule {}
