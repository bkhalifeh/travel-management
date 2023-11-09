"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppConfigService = void 0;
var common_1 = require("@nestjs/common");
var AppConfigService = /** @class */ (function () {
    function AppConfigService(configService) {
        this.configService = configService;
        AppConfigService_1.APP_HOST = configService.get('APP_HOST');
        AppConfigService_1.APP_PORT = configService.get('APP_PORT');
        AppConfigService_1.DB_SCHEMA = configService.get('DB_SCHEMA');
        AppConfigService_1.DB_HOST = configService.get('DB_HOST');
        AppConfigService_1.DB_PORT = configService.get('DB_PORT');
        AppConfigService_1.DB_NAME = configService.get('DB_NAME');
        AppConfigService_1.DB_USER = configService.get('DB_USER');
        AppConfigService_1.DB_PASS = configService.get('DB_PASS');
        AppConfigService_1.SECRET_COOKIE =
            configService.get('SECRET_COOKIE');
        AppConfigService_1.SECRET_SESSION =
            configService.get('SECRET_SESSION');
        AppConfigService_1.EMAIL_HOST = configService.get('EMAIL_HOST');
        AppConfigService_1.EMAIL_PORT = configService.get('EMAIL_PORT');
        AppConfigService_1.EMAIL_USER = configService.get('EMAIL_USER');
        AppConfigService_1.EMAIL_PASS = configService.get('EMAIL_PASS');
        AppConfigService_1.ENTRY_YEARS = JSON.parse(configService.get('ENTRY_YEARS')).map(function (v) { return "" + v; });
        AppConfigService_1.FIELDS = JSON.parse(configService.get('FIELDS'));
        AppConfigService_1.ADMIN_FIRST_NAME = configService.get('ADMIN_FIRST_NAME');
        AppConfigService_1.ADMIN_LAST_NAME = configService.get('ADMIN_LAST_NAME');
        AppConfigService_1.ADMIN_PHONE_NUMBER = configService.get('ADMIN_PHONE_NUMBER');
        AppConfigService_1.ADMIN_EMAIL = configService.get('ADMIN_EMAIL');
        AppConfigService_1.ADMIN_PASSWORD = configService.get('ADMIN_PASSWORD');
        AppConfigService_1.ADMIN_GENDERE = configService.get('ADMIN_GENDERE');
        AppConfigService_1.ADMIN_PROFILE = configService.get('ADMIN_PROFILE');
    }
    AppConfigService_1 = AppConfigService;
    var AppConfigService_1;
    AppConfigService = AppConfigService_1 = __decorate([
        common_1.Injectable()
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
