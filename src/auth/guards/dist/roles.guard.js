"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGuard = void 0;
var common_1 = require("@nestjs/common");
var role_decorator_1 = require("../decorators/role.decorator");
var RoleGuard = /** @class */ (function () {
    function RoleGuard(reflector) {
        this.reflector = reflector;
    }
    RoleGuard.prototype.canActivate = function (context) {
        var requiredRole = this.reflector.getAllAndOverride(role_decorator_1.ROLE_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRole) {
            return true;
        }
        var user = context.switchToHttp().getRequest().user;
        return user.role === requiredRole;
    };
    RoleGuard = __decorate([
        common_1.Injectable()
    ], RoleGuard);
    return RoleGuard;
}());
exports.RoleGuard = RoleGuard;
