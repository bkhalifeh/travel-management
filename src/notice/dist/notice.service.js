"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.NoticeService = void 0;
var common_1 = require("@nestjs/common");
var notice_schema_1 = require("./schemas/notice.schema");
var mongoose_1 = require("@nestjs/mongoose");
var NoticeService = /** @class */ (function () {
    function NoticeService(noticeModel, userService) {
        this.noticeModel = noticeModel;
        this.userService = userService;
    }
    NoticeService.prototype.findAll = function () {
        return this.noticeModel.find();
    };
    NoticeService.prototype.read = function (ids) {
        return this.noticeModel.updateMany({
            _id: {
                $in: ids
            }
        }, {
            $set: {
                isReaded: true
            }
        }).exec();
    };
    NoticeService.prototype["delete"] = function (ids) {
        console.log(ids);
        return this.noticeModel
            .deleteMany({
            _id: {
                $in: ids
            }
        })
            .exec();
        // return this.noticeModel.findByIdAndRemove(id).exec();
    };
    NoticeService.prototype.findUnReadedNotice = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // let user = await this.userService.findOneById(id);
                // user = await user.populate({
                //     path: 'notices',
                //     populate: { path: 'author', model: this.userService.userModel }
                // });
                // return user.notices;
                return [2 /*return*/, this.noticeModel
                        .find({
                        reciver: id,
                        isReaded: false
                    })
                        .populate({ path: 'author', model: this.userService.userModel })
                        .exec()];
            });
        });
    };
    NoticeService.prototype.findReadedNotice = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.noticeModel
                        .find({
                        reciver: id,
                        isReaded: true
                    })
                        .populate({ path: 'author', model: this.userService.userModel })
                        .exec()];
            });
        });
    };
    NoticeService.prototype.work = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    NoticeService.prototype.create = function (userId, createNoticeDto) {
        return __awaiter(this, void 0, void 0, function () {
            var users, author;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findAll()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, this.userService.findOneById(userId)];
                    case 2:
                        author = _a.sent();
                        users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var newNotice;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        newNotice = new this.noticeModel(__assign({ author: author, reciver: user }, createNoticeDto));
                                        return [4 /*yield*/, newNotice.save()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    NoticeService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(notice_schema_1.Notice.name))
    ], NoticeService);
    return NoticeService;
}());
exports.NoticeService = NoticeService;
