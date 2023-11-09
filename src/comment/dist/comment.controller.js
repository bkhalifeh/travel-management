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
exports.CommentController = void 0;
var common_1 = require("@nestjs/common");
var role_enum_1 = require("src/auth/enums/role.enum");
var role_decorator_1 = require("src/auth/decorators/role.decorator");
var util_service_1 = require("src/util/util.service");
var CommentController = /** @class */ (function () {
    function CommentController(commentService) {
        this.commentService = commentService;
    }
    CommentController.prototype.createComment = function (createCommentDto, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentService.create(req.user, createCommentDto)];
                    case 1:
                        _a.sent();
                        res.redirect("/travel/" + createCommentDto.travelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentController.prototype.managementGet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRole, myCommentCount, trashCommentCount, unVerifyCommentCount, unVerifiedComments, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userRole = req.user.role;
                        myCommentCount = 0;
                        trashCommentCount = 0;
                        unVerifyCommentCount = 0;
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.commentService.findAll()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (v) { return __awaiter(_this, void 0, void 0, function () {
                                var o;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, v.populate('author')];
                                        case 1:
                                            o = _a.sent();
                                            return [2 /*return*/, o.populate('travel')];
                                    }
                                });
                            }); })])];
                    case 2:
                        unVerifiedComments = (_c.sent()).filter(function (c) {
                            //--------------
                            if (!c.isVerified && (([role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(userRole))
                                || ([role_enum_1.Role.ComputerGroupManager, role_enum_1.Role.ComputerForumAdmin, role_enum_1.Role.ComputerForumMember].includes(userRole) && c.author.field === 'کامپیوتر')
                                || ([role_enum_1.Role.IndustryGroupManager, role_enum_1.Role.IndustryForumAdmin, role_enum_1.Role.IndustryForumMember].includes(userRole) && c.author.field === 'صنایع'))) {
                                if (c.inTrash)
                                    trashCommentCount += 1;
                                else
                                    unVerifyCommentCount += 1;
                                return c;
                            }
                            else if (c.author._id.toString() === req.user.id) {
                                myCommentCount += 1;
                                return c;
                            }
                        });
                        console.log(unVerifiedComments);
                        res.render('comment/management', {
                            user: req.user,
                            asideMenu: 'management',
                            asideSubMenu: 'comment-management',
                            comments: unVerifiedComments,
                            CommentManagement: role_enum_1.CommentManagement,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            customeFormatTime: util_service_1.UtilService.customeFormatTime,
                            myCommentCount: myCommentCount,
                            trashCommentCount: trashCommentCount,
                            unVerifyCommentCount: unVerifyCommentCount
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentController.prototype.deleteComment = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentService.findOne(id)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('travel')];
                    case 2:
                        comment = _a.sent();
                        return [4 /*yield*/, comment.travel.populate('manager')];
                    case 3:
                        travel = _a.sent();
                        if (!
                        // travel.manager._id.toString() === req.user.id ||
                        ([role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(req.user.role) ||
                            (travel.manager.role === role_enum_1.Role.ComputerForumAdmin &&
                                req.user.role === role_enum_1.Role.ComputerGroupManager) ||
                            (travel.manager.role === role_enum_1.Role.IndustryForumAdmin &&
                                req.user.role === role_enum_1.Role.IndustryGroupManager))) 
                        // travel.manager._id.toString() === req.user.id ||
                        return [3 /*break*/, 5];
                        return [4 /*yield*/, this.commentService["delete"](id)];
                    case 4:
                        _a.sent();
                        res.redirect('/comment/management');
                        return [3 /*break*/, 6];
                    case 5: throw new common_1.ForbiddenException();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CommentController.prototype.verifiedComment = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentService.findOne(id)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('travel')];
                    case 2:
                        comment = _a.sent();
                        return [4 /*yield*/, comment.travel.populate('manager')];
                    case 3:
                        travel = _a.sent();
                        if (!(travel.manager._id.toString() === req.user.id ||
                            [role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(req.user.role) ||
                            (travel.manager.role === role_enum_1.Role.ComputerForumAdmin &&
                                req.user.role === role_enum_1.Role.ComputerGroupManager) ||
                            (travel.manager.role === role_enum_1.Role.IndustryForumAdmin &&
                                req.user.role === role_enum_1.Role.IndustryGroupManager))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.commentService.verified(id)];
                    case 4:
                        _a.sent();
                        res.redirect('/comment/management');
                        return [3 /*break*/, 6];
                    case 5: throw new common_1.ForbiddenException();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Post('create'),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], CommentController.prototype, "createComment");
    __decorate([
        common_1.Get('management'),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], CommentController.prototype, "managementGet");
    __decorate([
        common_1.Get('delete/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CommentManagement),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], CommentController.prototype, "deleteComment");
    __decorate([
        common_1.Get('verified/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CommentManagement),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], CommentController.prototype, "verifiedComment");
    CommentController = __decorate([
        common_1.Controller('comment')
    ], CommentController);
    return CommentController;
}());
exports.CommentController = CommentController;
