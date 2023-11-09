"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var common_1 = require("@nestjs/common");
var profile_service_1 = require("./profile.service");
var profile_controller_1 = require("./profile.controller");
var user_module_1 = require("src/user/user.module");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        common_1.Module({
            imports: [user_module_1.UserModule],
            controllers: [profile_controller_1.ProfileController],
            providers: [profile_service_1.ProfileService]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
