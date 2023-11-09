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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.NoticeController = void 0;
var common_1 = require("@nestjs/common");
var role_enum_1 = require("src/auth/enums/role.enum");
var auth_guard_1 = require("src/auth/guards/auth.guard");
var util_service_1 = require("src/util/util.service");
var NoticeController = /** @class */ (function () {
    function NoticeController(noticeService) {
        this.noticeService = noticeService;
    }
    NoticeController.prototype.noticeGet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var notices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.findUnReadedNotice(req.user.id)];
                    case 1:
                        notices = _a.sent();
                        res.render('notice/unreaded.pug', {
                            user: req.user,
                            asideMenu: 'notice',
                            asideNotice: 'unreaded',
                            notices: notices,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            CommentManagement: role_enum_1.CommentManagement,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            NoitceManagement: role_enum_1.NoitceManagement,
                            customeFormatTime: util_service_1.UtilService.customeFormatTime
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.managementGet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var notices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.findAll()];
                    case 1:
                        notices = _a.sent();
                        res.render('notice/management.pug', {
                            user: req.user,
                            asideMenu: 'notice',
                            asideNotice: 'management',
                            notices: notices,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            CommentManagement: role_enum_1.CommentManagement,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            NoitceManagement: role_enum_1.NoitceManagement,
                            customeFormatTime: util_service_1.UtilService.customeFormatTime
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.readNotice = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.read([id])];
                    case 1:
                        _a.sent();
                        res.redirect('/notice/unreaded');
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.readNotices = function (readNoticeDto, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.read(readNoticeDto.ids)];
                    case 1:
                        _a.sent();
                        res.redirect('/notice/unreaded');
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.deleteNotice = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService["delete"]([id])];
                    case 1:
                        _a.sent();
                        res.redirect('/notice/unreaded');
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.deleteNotices = function (deleteNoticeDto, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(deleteNoticeDto.ids);
                        return [4 /*yield*/, this.noticeService["delete"](deleteNoticeDto.ids)];
                    case 1:
                        _a.sent();
                        res.redirect('/notice/unreaded');
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.createNotice = function (createNoticeDto, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.create(req.user.id, createNoticeDto)];
                    case 1:
                        _a.sent();
                        res.redirect('/notice/unreaded');
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeController.prototype.work = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // await this.noticeService.create();
                // return 'done';
                // return this.noticeService.findUnReadedNotice(req.user.id);
                this.noticeService.work();
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        common_1.Get('unreaded'),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], NoticeController.prototype, "noticeGet");
    __decorate([
        common_1.Get('management'),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], NoticeController.prototype, "managementGet");
    __decorate([
        common_1.Get('read/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], NoticeController.prototype, "readNotice");
    __decorate([
        common_1.Patch('read'),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], NoticeController.prototype, "readNotices");
    __decorate([
        common_1.Get('delete/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], NoticeController.prototype, "deleteNotice");
    __decorate([
        common_1.Delete('delete'),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], NoticeController.prototype, "deleteNotices");
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], NoticeController.prototype, "createNotice");
    __decorate([
        common_1.Get('work'),
        __param(0, common_1.Req())
    ], NoticeController.prototype, "work");
    NoticeController = __decorate([
        common_1.UseGuards(auth_guard_1.AuthenticatedGuard),
        common_1.Controller('notice')
    ], NoticeController);
    return NoticeController;
}());
exports.NoticeController = NoticeController;
