"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var serve_static_1 = require("@nestjs/serve-static");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("../auth/auth.module");
var user_module_1 = require("../user/user.module");
var mail_module_1 = require("../mail/mail.module");
var travel_module_1 = require("../travel/travel.module");
var config_1 = require("@nestjs/config");
var mongoose_factory_1 = require("../factory/mongoose.factory");
var path_1 = require("path");
var nestjs_form_data_1 = require("nestjs-form-data");
var setting_module_1 = require("../setting/setting.module");
var notice_module_1 = require("../notice/notice.module");
var history_module_1 = require("../history/history.module");
var app_config_module_1 = require("../app-config/app-config.module");
var comment_module_1 = require("../comment/comment.module");
var util_module_1 = require("../util/util.module");
var profile_module_1 = require("../profile/profile.module");
var admin_module_1 = require("../admin/admin.module");
var invoice_module_1 = require("../invoice/invoice.module");
var core_1 = require("@nestjs/core");
var not_found_filter_1 = require("./filters/not.found.filter");
var role_guard_1 = require("src/auth/guards/role.guard");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                app_config_module_1.AppConfigModule,
                mongoose_1.MongooseModule.forRootAsync({
                    useFactory: mongoose_factory_1.mongooseFactory,
                    inject: [config_1.ConfigService]
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: path_1.join(__dirname, '..', '..', 'static'),
                    serveRoot: '/static'
                }),
                nestjs_form_data_1.NestjsFormDataModule.config({
                    storage: nestjs_form_data_1.MemoryStoredFile,
                    isGlobal: true
                }),
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                mail_module_1.MailModule,
                travel_module_1.TravelModule,
                setting_module_1.SettingModule,
                notice_module_1.NoticeModule,
                history_module_1.HistoryModule,
                comment_module_1.CommentModule,
                util_module_1.UtilModule,
                profile_module_1.ProfileModule,
                admin_module_1.AdminModule,
                invoice_module_1.InvoiceModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                {
                    provide: core_1.APP_FILTER,
                    useClass: not_found_filter_1.NotFoundFilter
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: role_guard_1.RolesGuard
                },
                app_service_1.AppService,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
