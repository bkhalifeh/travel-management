"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var session_serializer_1 = require("./providers/session.serializer");
var local_strategy_1 = require("./providers/local.strategy");
var passport_1 = require("@nestjs/passport");
var user_module_1 = require("src/user/user.module");
var mail_module_1 = require("src/mail/mail.module");
var mongoose_1 = require("@nestjs/mongoose");
var email_verify_schema_1 = require("./schemas/email.verify.schema");
var forgot_password_schema_1 = require("./schemas/forgot.password.schema");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: email_verify_schema_1.EmailVerify.name, schema: email_verify_schema_1.EmailVerifySchema },
                    { name: forgot_password_schema_1.ForgotPassword.name, schema: forgot_password_schema_1.ForgotPasswordSchema },
                ]),
                passport_1.PassportModule,
                user_module_1.UserModule,
                mail_module_1.MailModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, session_serializer_1.SessionSerializer],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
