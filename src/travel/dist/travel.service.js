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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.TravelService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var exceljs_1 = require("exceljs");
var travel_schema_1 = require("./schemas/travel.schema");
var fs_1 = require("fs");
var path_1 = require("path");
var role_enum_1 = require("src/auth/enums/role.enum");
var TravelService = /** @class */ (function () {
    function TravelService(travelModel, userService) {
        this.travelModel = travelModel;
        this.userService = userService;
    }
    TravelService.prototype.findAll = function () {
        return this.travelModel.find();
    };
    TravelService.prototype.edit = function (id, updateTravelDto) {
        return __awaiter(this, void 0, void 0, function () {
            var image, ut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = updateTravelDto.image, ut = __rest(updateTravelDto, ["image"]);
                        // const travel = await this.findOneById(id);
                        // if (travel.capacity < ut.capacity)
                        return [4 /*yield*/, this.travelModel.updateOne({ id: id }, { $set: ut }).exec()];
                    case 1:
                        // const travel = await this.findOneById(id);
                        // if (travel.capacity < ut.capacity)
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelService.prototype.create = function (mid, createTravelDto) {
        return __awaiter(this, void 0, void 0, function () {
            var image, services, itemsNeeded, newTravelDto, newTravel, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        image = createTravelDto.image, services = createTravelDto.services, itemsNeeded = createTravelDto.itemsNeeded, newTravelDto = __rest(createTravelDto, ["image", "services", "itemsNeeded"]);
                        fs_1.writeFileSync(path_1.join(__dirname, '..', '..', 'static', 'upload', image.originalName), image.buffer);
                        _b = (_a = this.travelModel).bind;
                        _c = [__assign({}, newTravelDto)];
                        _d = { image: "/static/upload/" + image.originalName, services: services.split(','), itemsNeeded: itemsNeeded.split(',') };
                        return [4 /*yield*/, this.userService.findOneById(mid)];
                    case 1:
                        newTravel = new (_b.apply(_a, [void 0, __assign.apply(void 0, _c.concat([(_d.manager = _e.sent(), _d)]))]))();
                        return [2 /*return*/, newTravel.save()];
                }
            });
        });
    };
    TravelService.prototype.findOneById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.travelModel.findById(id)];
            });
        });
    };
    TravelService.prototype.deleteById = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneById(id)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('manager')];
                    case 2:
                        travel = _a.sent();
                        if (travel.manager.role === user.role ||
                            [role_enum_1.Role.SystemManager, role_enum_1.Role.CollegeManager].includes(user.role) ||
                            (travel.manager.role === role_enum_1.Role.ComputerForumAdmin &&
                                user.role === role_enum_1.Role.ComputerGroupManager) ||
                            (travel.manager.role === role_enum_1.Role.IndustryForumAdmin &&
                                user.role === role_enum_1.Role.IndustryGroupManager)) {
                            return [2 /*return*/, this.travelModel.deleteOne({ id: id })];
                        }
                        throw new common_1.ForbiddenException();
                }
            });
        });
    };
    TravelService.prototype.exportExcel = function (travelId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var workbook, worksheet, travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbook = new exceljs_1["default"].Workbook();
                        worksheet = workbook.addWorksheet('لیست افراد');
                        worksheet.views = [{ rightToLeft: true }];
                        worksheet.columns = [
                            { key: 'firstName', header: 'نام' },
                            { key: 'lastName', header: 'نام خانوادگی' },
                            { key: 'studentId', header: 'کد دانشجویی' },
                            { key: 'field', header: 'رشته' },
                            { key: 'phoneNumber', header: 'شماره تلفن' },
                        ];
                        return [4 /*yield*/, this.findOneById(travelId)];
                    case 1: return [4 /*yield*/, (_a.sent()).populate('users')];
                    case 2:
                        travel = _a.sent();
                        travel.users.forEach(function (user) {
                            worksheet.addRow(user);
                        });
                        return [4 /*yield*/, workbook.xlsx.write(res)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelService.prototype.signupUserIntoTravel = function (userId, travelId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, travel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneById(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.findOneById(travelId)];
                    case 2:
                        travel = _a.sent();
                        if (!(travel.users.length < travel.capacity)) return [3 /*break*/, 5];
                        user.travels.push(travel);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        travel.users.push(user);
                        return [4 /*yield*/, travel.save()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TravelService.prototype.signupCancelUserFromTravel = function (userId, travelId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, travel, idxTravelInUser, idxUserInTravel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneById(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.findOneById(travelId)];
                    case 2:
                        travel = _a.sent();
                        idxTravelInUser = user.travels.findIndex(function (v) { return v._id.toString() === travelId; });
                        user.travels.splice(idxTravelInUser, 1);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        idxUserInTravel = travel.users.findIndex(function (v) { return v._id.toString() === userId; });
                        travel.users.splice(idxUserInTravel, 1);
                        return [4 /*yield*/, travel.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TravelService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(travel_schema_1.Travel.name))
    ], TravelService);
    return TravelService;
}());
exports.TravelService = TravelService;
