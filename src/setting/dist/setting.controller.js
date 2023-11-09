"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SettingController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("src/auth/guards/auth.guard");
var nestjs_form_data_1 = require("nestjs-form-data");
var role_enum_1 = require("src/auth/enums/role.enum");
var SettingController = /** @class */ (function () {
    function SettingController(settingService) {
        this.settingService = settingService;
    }
    SettingController.prototype.accountGet = function (req, res) {
        console.log(req.user);
        res.render('setting/account', {
            user: req.user,
            asideMenu: 'setting',
            asideSubMenu: 'account',
            CommentManagement: role_enum_1.CommentManagement,
            CreateTravelRoles: role_enum_1.CreateTravelRoles,
            UserManagementRoles: role_enum_1.UserManagementRoles
        });
    };
    SettingController.prototype.accountPost = function (changeAccountDto, req, res) {
        this.settingService.changeUserAccount(req, changeAccountDto);
        req.logIn(req.user, function (error) {
            if (error)
                throw error;
            console.log('FUCK');
            res.redirect('/');
        });
    };
    SettingController.prototype.securityGet = function (req, res) {
        res.render('setting/security', {
            user: req.user,
            asideMenu: 'setting',
            asideSubMenu: 'security',
            CommentManagement: role_enum_1.CommentManagement,
            CreateTravelRoles: role_enum_1.CreateTravelRoles,
            UserManagementRoles: role_enum_1.UserManagementRoles
        });
    };
    SettingController.prototype.securityPost = function (changePasswordDto, req, res) {
        this.settingService.changeUserPassword(req.user.id, changePasswordDto);
        res.redirect('/');
    };
    __decorate([
        common_1.Get('account'),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SettingController.prototype, "accountGet");
    __decorate([
        common_1.Post('account'),
        nestjs_form_data_1.FormDataRequest({ storage: nestjs_form_data_1.MemoryStoredFile }),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], SettingController.prototype, "accountPost");
    __decorate([
        common_1.Get('security'),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SettingController.prototype, "securityGet");
    __decorate([
        common_1.Post('security'),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], SettingController.prototype, "securityPost");
    SettingController = __decorate([
        common_1.UseGuards(auth_guard_1.AuthenticatedGuard),
        common_1.Controller('setting')
    ], SettingController);
    return SettingController;
}());
exports.SettingController = SettingController;
