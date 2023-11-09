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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var user_schema_1 = require("./schemas/user.schema");
var util_service_1 = require("src/util/util.service");
var role_enum_1 = require("src/auth/enums/role.enum");
var argon2_1 = require("argon2");
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        this.userModel = userModel;
    }
    UserService.prototype.deleteOne = function (id) {
        return this.userModel.findByIdAndRemove(id).exec();
    };
    UserService.prototype.findOneByEmail = function (email) {
        return this.userModel.findOne({ email: email });
    };
    UserService.prototype.findOneById = function (id) {
        return this.userModel.findById(id);
    };
    UserService.prototype.findAll = function () {
        return this.userModel.find();
    };
    UserService.prototype.findAllByRole = function (r) {
        var users;
        if (r === role_enum_1.Role.SystemManager) {
            return this.userModel.find();
        }
        else if (r === role_enum_1.Role.CollegeManager) {
            return this.userModel.find({
                role: { $ne: role_enum_1.Role.SystemManager }
            });
        }
        else if (r === role_enum_1.Role.ComputerGroupManager ||
            r === role_enum_1.Role.ComputerForumAdmin) {
            return this.userModel.find({
                field: { $eq: 'کامپیوتر' }
            });
        }
        else if (r === role_enum_1.Role.IndustryGroupManager ||
            r === role_enum_1.Role.IndustryForumAdmin) {
            return this.userModel.find({
                field: { $eq: 'صنایع' }
            });
        }
        else {
            return [];
        }
    };
    UserService.prototype.create = function (createUserDto) {
        var newUser = new this.userModel(__assign(__assign({}, createUserDto), { profile: util_service_1.UtilService.randomProfile(createUserDto.gendere) }));
        return newUser.save();
    };
    UserService.prototype.updateOne = function (id, manualUpdateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(manualUpdateUserDto.firstName && manualUpdateUserDto.firstName.length > 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    firstName: manualUpdateUserDto.firstName
                                }
                            }).exec()];
                    case 1:
                        _f.sent();
                        _f.label = 2;
                    case 2:
                        if (!(manualUpdateUserDto.lastName && manualUpdateUserDto.lastName.length > 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    lastName: manualUpdateUserDto.lastName
                                }
                            }).exec()];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        if (!(manualUpdateUserDto.phoneNumber && manualUpdateUserDto.phoneNumber.length > 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    phoneNumber: manualUpdateUserDto.phoneNumber
                                }
                            }).exec()];
                    case 5:
                        _f.sent();
                        _f.label = 6;
                    case 6:
                        if (!(manualUpdateUserDto.email && manualUpdateUserDto.email.length > 1)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    email: manualUpdateUserDto.email
                                }
                            }).exec()];
                    case 7:
                        _f.sent();
                        _f.label = 8;
                    case 8:
                        if (!(manualUpdateUserDto.gendere && manualUpdateUserDto.gendere.length > 1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    gendere: manualUpdateUserDto.gendere
                                }
                            }).exec()];
                    case 9:
                        _f.sent();
                        _f.label = 10;
                    case 10:
                        if (!(manualUpdateUserDto.password && manualUpdateUserDto.password.length > 1)) return [3 /*break*/, 13];
                        _b = (_a = this.userModel).findByIdAndUpdate;
                        _c = [id];
                        _d = {};
                        _e = {};
                        return [4 /*yield*/, argon2_1.hash(manualUpdateUserDto.password)];
                    case 11: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$set = (_e.password = _f.sent(),
                                _e),
                                _d)])).exec()];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        if (!manualUpdateUserDto.role) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    role: manualUpdateUserDto.role
                                }
                            }).exec()];
                    case 14:
                        _f.sent();
                        _f.label = 15;
                    case 15:
                        if (!(manualUpdateUserDto.studentId && manualUpdateUserDto.studentId.length > 1)) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    studentId: manualUpdateUserDto.studentId
                                }
                            }).exec()];
                    case 16:
                        _f.sent();
                        _f.label = 17;
                    case 17:
                        if (!(manualUpdateUserDto.entryYear && manualUpdateUserDto.entryYear.length > 1)) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    entryYear: manualUpdateUserDto.entryYear
                                }
                            }).exec()];
                    case 18:
                        _f.sent();
                        _f.label = 19;
                    case 19:
                        if (!(manualUpdateUserDto.field && manualUpdateUserDto.field.length > 1)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, {
                                $set: {
                                    field: manualUpdateUserDto.field
                                }
                            }).exec()];
                    case 20:
                        _f.sent();
                        _f.label = 21;
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.work = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(user_schema_1.User.name))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
