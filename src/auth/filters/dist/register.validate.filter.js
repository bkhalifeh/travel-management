"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterValidateFilter = void 0;
var common_1 = require("@nestjs/common");
var RegisterValidateFilter = /** @class */ (function () {
    function RegisterValidateFilter() {
    }
    RegisterValidateFilter.prototype["catch"] = function (exception, host) {
        var errs = exception.getResponse().message;
        var res = host.switchToHttp().getResponse();
        var context = {
            isValidate: true,
            isValidUsername: true,
            isValidEmail: true,
            isValidPassword: true
        };
        if (errs.includes('username')) {
            context['isValidUsername'] = false;
            context['errUsername'] =
                'نام کاربری باید با حروف شروع شود و فقط حروف انگلیسی و اعداد مجاز است';
        }
        if (errs.includes('email')) {
            context['isValidEmail'] = false;
            context['errEmail'] = 'ایمیلی که شما وارد کرده اید اشتباه است';
        }
        if (errs.includes('password')) {
            context['isValidPassword'] = false;
            context['errPassword'] =
                'رمز عبور باید از حروف بزرگ و کوچک و اعداد و حروف خاص تشکیل شده باشد';
        }
        res.render('auth/register', context);
    };
    RegisterValidateFilter = __decorate([
        common_1.Catch(common_1.BadRequestException)
    ], RegisterValidateFilter);
    return RegisterValidateFilter;
}());
exports.RegisterValidateFilter = RegisterValidateFilter;
