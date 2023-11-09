import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    public static APP_HOST: string;
    public static APP_PORT: number;

    public static DB_SCHEMA: string;
    public static DB_HOST: string;
    public static DB_PORT: number;
    public static DB_NAME: string;
    public static DB_USER: string;
    public static DB_PASS: string;

    public static SECRET_COOKIE: string;
    public static SECRET_SESSION: string;

    public static ADMIN_FIRST_NAME: string;
    public static ADMIN_LAST_NAME: string;
    public static ADMIN_PHONE_NUMBER: string;
    public static ADMIN_EMAIL: string;
    public static ADMIN_PASSWORD: string;
    public static ADMIN_GENDERE: string;
    public static ADMIN_PROFILE: string;

    public static EMAIL_HOST: string;
    public static EMAIL_PORT: number;
    public static EMAIL_USER: string;
    public static EMAIL_PASS: string;
    public static ENTRY_YEARS: string[];
    public static FIELDS: string[];

    constructor(private readonly configService: ConfigService) {
        AppConfigService.APP_HOST = configService.get<string>('APP_HOST');
        AppConfigService.APP_PORT = configService.get<number>('APP_PORT');
        AppConfigService.DB_SCHEMA = configService.get<string>('DB_SCHEMA');
        AppConfigService.DB_HOST = configService.get<string>('DB_HOST');
        AppConfigService.DB_PORT = configService.get<number>('DB_PORT');
        AppConfigService.DB_NAME = configService.get<string>('DB_NAME');
        AppConfigService.DB_USER = configService.get<string>('DB_USER');
        AppConfigService.DB_PASS = configService.get<string>('DB_PASS');
        AppConfigService.SECRET_COOKIE =
            configService.get<string>('SECRET_COOKIE');
        AppConfigService.SECRET_SESSION =
            configService.get<string>('SECRET_SESSION');

        AppConfigService.EMAIL_HOST = configService.get<string>('EMAIL_HOST');
        AppConfigService.EMAIL_PORT = configService.get<number>('EMAIL_PORT');
        AppConfigService.EMAIL_USER = configService.get<string>('EMAIL_USER');
        AppConfigService.EMAIL_PASS = configService.get<string>('EMAIL_PASS');
        AppConfigService.ENTRY_YEARS = JSON.parse(
            configService.get<string>('ENTRY_YEARS'),
        ).map((v) => `${v}`);
        AppConfigService.FIELDS = JSON.parse(
            configService.get<string>('FIELDS'),
        );

        AppConfigService.ADMIN_FIRST_NAME =
            configService.get<string>('ADMIN_FIRST_NAME');
        AppConfigService.ADMIN_LAST_NAME =
            configService.get<string>('ADMIN_LAST_NAME');
        AppConfigService.ADMIN_PHONE_NUMBER =
            configService.get<string>('ADMIN_PHONE_NUMBER');
        AppConfigService.ADMIN_EMAIL = configService.get<string>('ADMIN_EMAIL');
        AppConfigService.ADMIN_PASSWORD =
            configService.get<string>('ADMIN_PASSWORD');
        AppConfigService.ADMIN_GENDERE =
            configService.get<string>('ADMIN_GENDERE');
        AppConfigService.ADMIN_PROFILE =
            configService.get<string>('ADMIN_PROFILE');
    }
}
