import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { AppService } from './app/app.service';
import morgan from 'morgan';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AppConfigService } from './app-config/app-config.service';
import { User, UserDocument } from './user/schemas/user.schema';
import { Model } from 'mongoose';
import { Role } from './auth/enums/role.enum';
import { hash } from 'argon2';
import { NoticeService } from './notice/notice.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const appService = app.get(AppService);
    const configService = app.get(ConfigService);
    const userService = app.get(UserService);
    const noticeService = app.get(NoticeService);

    const adminInfo = {
        firstName: AppConfigService.ADMIN_FIRST_NAME,
        lastName: AppConfigService.ADMIN_LAST_NAME,
        phoneNumber: AppConfigService.ADMIN_PHONE_NUMBER,
        email: AppConfigService.ADMIN_EMAIL,
        gendere: AppConfigService.ADMIN_GENDERE,
        password: await hash(AppConfigService.ADMIN_PASSWORD),
        profile: AppConfigService.ADMIN_PROFILE,
    };

    const userAdmin = await userService.findOneByEmail(adminInfo.email);
    if (userAdmin) {
        await userAdmin
            .updateOne({ $set: { ...adminInfo, role: Role.SystemManager } })
            .exec();
    } else {
        await new userService.userModel({
            ...adminInfo,
            role: Role.SystemManager,
        }).save();
    }

    app.use(morgan('dev'));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.disable('x-powered-by');
    app.enableCors();

    app.setViewEngine('pug');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));

    app.use(compression());
    app.use(cookieParser(configService.get<string>('SECRET_COOKIE')));
    app.use(
        expressSession({
            secret: configService.get<string>('SECRET_SESSION'),
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                client: appService.connection.getClient(),
                dbName: configService.get<string>('DB_NAME'),
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(async (req, res, next) => {
        if (req.user) {
            req.user.notices = await noticeService.findUnReadedNotice(
                req.user.id,
            );
        }
        next();
    });

    await app.listen(
        configService.get<number>('APP_PORT'),
        configService.get<string>('APP_HOST'),
    );
}
bootstrap();
