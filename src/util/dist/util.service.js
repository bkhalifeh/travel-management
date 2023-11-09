"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UtilService = void 0;
var common_1 = require("@nestjs/common");
var date_fns_1 = require("date-fns");
var role_enum_1 = require("src/auth/enums/role.enum");
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService_1 = UtilService;
    UtilService.randomInt = function (min, max) {
        var ceilMin = Math.ceil(min);
        var ceilMax = Math.floor(max);
        return Math.floor(Math.random() * (ceilMax - ceilMin) + ceilMin);
    };
    UtilService.randomProfile = function (gendere) {
        return "/static/img/avatars/" + gendere + "/" + UtilService_1.randomInt(1, 4) + ".png";
    };
    UtilService.roleScore = function (r) {
        if (r === role_enum_1.Role.SystemManager)
            return 6;
        else if (r === role_enum_1.Role.CollegeManager)
            return 5;
        else if (r === role_enum_1.Role.ComputerGroupManager ||
            r === role_enum_1.Role.IndustryGroupManager)
            return 4;
        else if (r === role_enum_1.Role.ComputerForumAdmin || r === role_enum_1.Role.IndustryForumAdmin)
            return 3;
        else if (r === role_enum_1.Role.ComputerForumMember ||
            r === role_enum_1.Role.IndustryForumMember)
            return 2;
        else
            return 1;
    };
    UtilService.customeFormatTime = function (d) {
        var s = date_fns_1.formatDistanceToNow(d).replaceAll('about ', '').replaceAll('over ', '')
            .replaceAll('almost', '');
        if (s === 'less than a minute')
            return 'کمتر از یک دقیقه قبل';
        else if (s.includes('minute'))
            return s.split(' ')[0] + " \u062F\u0642\u06CC\u0642\u0647 \u0642\u0628\u0644";
        else if (s.includes('hour'))
            return s.split(' ')[0] + " \u0633\u0627\u0639\u062A \u0642\u0628\u0644";
        else if (s.includes('day'))
            return s.split(' ')[0] + " \u0631\u0648\u0632 \u0642\u0628\u0644";
        else if (s.includes('month'))
            return s.split(' ')[0] + " \u0645\u0627\u0647 \u0642\u0628\u0644";
        else if (s.includes('year'))
            return s.split(' ')[0] + " \u0633\u0627\u0644 \u0642\u0628\u0644";
    };
    var UtilService_1;
    UtilService = UtilService_1 = __decorate([
        common_1.Injectable()
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
