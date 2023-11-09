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
exports.TravelController = void 0;
var common_1 = require("@nestjs/common");
var nestjs_form_data_1 = require("nestjs-form-data");
var auth_guard_1 = require("src/auth/guards/auth.guard");
var role_enum_1 = require("src/auth/enums/role.enum");
var role_decorator_1 = require("src/auth/decorators/role.decorator");
var util_service_1 = require("src/util/util.service");
var TravelController = /** @class */ (function () {
    function TravelController(travelService, commentService, userService) {
        this.travelService = travelService;
        this.commentService = commentService;
        this.userService = userService;
    }
    TravelController.prototype.listTravels = function (show, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.findAll()];
                    case 1:
                        arr = _a.sent();
                        return [4 /*yield*/, Promise.all(arr.map(function (t) { return t.populate('manager'); }))];
                    case 2:
                        arr = _a.sent();
                        //console.log(arr);
                        if (show === 'registered') {
                            arr = arr.filter(function (t) {
                                if (t.users.some(function (u) { return u._id.toString() === req.user.id; }))
                                    return t;
                                return false;
                            });
                        }
                        if (show === 'notregistered') {
                            arr = arr.filter(function (t) {
                                if (t.users.every(function (u) { return u._id.toString() !== req.user.id; }))
                                    return t;
                                return false;
                                // t.users.every
                            });
                        }
                        //console.log(arr);
                        res.render('travel/travels', {
                            user: req.user,
                            travels: arr,
                            asideMenu: 'travel',
                            asideSubMenu: 'travel',
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            CommentManagement: role_enum_1.CommentManagement,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            show: show,
                            Role: role_enum_1.Role
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.createTravelGet = function (req, res) {
        res.render('travel/create', {
            user: req.user,
            asideMenu: 'management',
            asideSubMenu: 'create-travel',
            CommentManagement: role_enum_1.CommentManagement,
            CreateTravelRoles: role_enum_1.CreateTravelRoles,
            UserManagementRoles: role_enum_1.UserManagementRoles,
            isEdit: false,
            titleCE: 'ساخت اردو جدید'
        });
    };
    TravelController.prototype.createTravelPost = function (createTravelDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            var travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.create(req.user.id, createTravelDto)];
                    case 1:
                        travel = _a.sent();
                        return [2 /*return*/, travel.id];
                }
            });
        });
    };
    TravelController.prototype.signupTravelGet = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.signupUserIntoTravel(req.user.id, id)];
                    case 1:
                        _a.sent();
                        res.redirect("/travel/" + id);
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.signupCancelGet = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.signupCancelUserFromTravel(req.user.id, id)];
                    case 1:
                        _a.sent();
                        res.redirect(req.headers.referer);
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.deleteTravel = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.deleteById(id, req.user)];
                    case 1:
                        _a.sent();
                        res.redirect('/travel');
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.editTravel = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.findOneById(id)];
                    case 1:
                        travel = _a.sent();
                        res.render('travel/create', {
                            user: req.user,
                            isEdit: true,
                            CommentManagement: role_enum_1.CommentManagement,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            travel: travel,
                            titleCE: 'ویرایش اردو'
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.listUsersGet = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.findOneById(id)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('manager')];
                    case 2: return [4 /*yield*/, (_a.sent()).populate('users')];
                    case 3:
                        travel = _a.sent();
                        if (travel.manager.role === req.user.role ||
                            [role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(req.user.role) ||
                            (travel.manager.role === role_enum_1.Role.ComputerForumAdmin &&
                                req.user.role === role_enum_1.Role.ComputerGroupManager) ||
                            (travel.manager.role === role_enum_1.Role.IndustryForumAdmin &&
                                req.user.role === role_enum_1.Role.IndustryGroupManager)) {
                            res.render('travel/list', {
                                user: req.user,
                                travel: travel,
                                CreateTravelRoles: role_enum_1.CreateTravelRoles,
                                CommentManagement: role_enum_1.CommentManagement,
                                UserManagementRoles: role_enum_1.UserManagementRoles
                            });
                        }
                        else {
                            throw new common_1.ForbiddenException();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.exportListUsersGet = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.travelService.findOneById(id)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('manager')];
                    case 2:
                        travel = _a.sent();
                        if (!(travel.manager.role === req.user.role ||
                            [role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(req.user.role) ||
                            (travel.manager.role === role_enum_1.Role.ComputerForumAdmin &&
                                req.user.role === role_enum_1.Role.ComputerGroupManager) ||
                            (travel.manager.role === role_enum_1.Role.IndustryForumAdmin &&
                                req.user.role === role_enum_1.Role.IndustryGroupManager))) return [3 /*break*/, 4];
                        res.setHeader('Content-Disposition', "attachment; filename=report.xlsx");
                        res.setHeader('Content-Type', 'application/force-download');
                        return [4 /*yield*/, this.travelService.exportExcel(id, res)];
                    case 3:
                        _a.sent();
                        res.end();
                        return [3 /*break*/, 5];
                    case 4: throw new common_1.ForbiddenException();
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TravelController.prototype.singleTravelGet = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var travel, isSignedUp, comments, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.travelService.findOneById(id)];
                    case 1:
                        travel = _c.sent();
                        console.log(travel.capacity - travel.users.length);
                        isSignedUp = travel.users.some(function (v) {
                            return v._id.toString() === req.user.id;
                        });
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.commentService.findManyByTravelId(id)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (c) { return c.populate('author'); })])];
                    case 3:
                        comments = _c.sent();
                        //console.log(comments);
                        res.render('travel/travel', {
                            user: req.user,
                            travel: travel,
                            isSignedUp: isSignedUp,
                            comments: comments,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            CommentManagement: role_enum_1.CommentManagement,
                            UserManagementRoles: role_enum_1.UserManagementRoles,
                            customeFormatTime: util_service_1.UtilService.customeFormatTime
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('show')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "listTravels");
    __decorate([
        common_1.Get('create'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], TravelController.prototype, "createTravelGet");
    __decorate([
        common_1.Post('create'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        nestjs_form_data_1.FormDataRequest({ storage: nestjs_form_data_1.MemoryStoredFile }),
        __param(0, common_1.Body()),
        __param(1, common_1.Req())
    ], TravelController.prototype, "createTravelPost");
    __decorate([
        common_1.Get('signup/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "signupTravelGet");
    __decorate([
        common_1.Get('signup-cancel/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "signupCancelGet");
    __decorate([
        common_1.Get('delete/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "deleteTravel");
    __decorate([
        common_1.Get('edit/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "editTravel");
    __decorate([
        common_1.Get('list/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "listUsersGet");
    __decorate([
        common_1.Get('export/:id'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.CreateTravelRoles),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "exportListUsersGet");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], TravelController.prototype, "singleTravelGet");
    TravelController = __decorate([
        common_1.UseGuards(auth_guard_1.AuthenticatedGuard),
        common_1.Controller('travel')
    ], TravelController);
    return TravelController;
}());
exports.TravelController = TravelController;
