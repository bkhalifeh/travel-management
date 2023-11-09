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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var argon2_1 = require("argon2");
var mongoose_1 = require("@nestjs/mongoose");
var crypto_1 = require("crypto");
var email_verify_schema_1 = require("./schemas/email.verify.schema");
var forgot_password_schema_1 = require("./schemas/forgot.password.schema");
var AuthService = /** @class */ (function () {
    function AuthService(emailVerifyModel, forgotPasswordModel, userService, mailService) {
        this.emailVerifyModel = emailVerifyModel;
        this.forgotPasswordModel = forgotPasswordModel;
        this.userService = userService;
        this.mailService = mailService;
    }
    AuthService.prototype.validateUser = function (email, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneByEmail(email)];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, argon2_1.verify(user.password, password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            //const { password, isEmailVerified, ...res } = user;
                            return [2 /*return*/, {
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    phoneNumber: user.phoneNumber,
                                    email: user.email,
                                    gendere: user.gendere,
                                    profile: user.profile,
                                    role: user.role,
                                    studentId: user.studentId,
                                    entryYear: user.entryYear,
                                    field: user.field
                                }];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.sendVerifyEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var emailVerify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerifyModel.findOne({ email: email })];
                    case 1:
                        emailVerify = _a.sent();
                        if (!(emailVerify &&
                            (new Date().getTime() - emailVerify.timestamp.getTime()) / 60000 < 2)) return [3 /*break*/, 2];
                        throw new common_1.ForbiddenException([
                            'A confirmation email has recently been sent.',
                        ]);
                    case 2:
                        if (!emailVerify) return [3 /*break*/, 3];
                        emailVerify.token = crypto_1.randomUUID();
                        emailVerify.timestamp = new Date();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.emailVerifyModel.create({
                            email: email,
                            token: crypto_1.randomUUID(),
                            timestamp: new Date()
                        })];
                    case 4:
                        emailVerify = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, emailVerify.save()];
                    case 6:
                        _a.sent();
                        try {
                            this.mailService.sendVerifyEmail(email, emailVerify.token);
                        }
                        catch (e) {
                            console.log(e);
                            throw new common_1.HttpException('Can not send verification email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.registerUser = function (registerAuthDto) {
        return __awaiter(this, void 0, void 0, function () {
            var repeatPassword, createUser, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repeatPassword = registerAuthDto.repeatPassword, createUser = __rest(registerAuthDto, ["repeatPassword"]);
                        if (!(repeatPassword === createUser.password)) return [3 /*break*/, 2];
                        _a = createUser;
                        return [4 /*yield*/, argon2_1.hash(createUser.password)];
                    case 1:
                        _a.password = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.forgotPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var forgotPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forgotPasswordModel.findOne({ email: email })];
                    case 1:
                        forgotPassword = _a.sent();
                        if (!(forgotPassword &&
                            (new Date().getTime() - forgotPassword.timestamp.getTime()) /
                                60000 <
                                2)) return [3 /*break*/, 2];
                        throw new common_1.ForbiddenException([
                            'A confirmation email has recently been sent.',
                        ]);
                    case 2:
                        if (!forgotPassword) return [3 /*break*/, 3];
                        forgotPassword.token = crypto_1.randomUUID();
                        forgotPassword.timestamp = new Date();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.emailVerifyModel.create({
                            email: email,
                            token: crypto_1.randomUUID(),
                            timestamp: new Date()
                        })];
                    case 4:
                        forgotPassword = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, forgotPassword.save()];
                    case 6:
                        _a.sent();
                        try {
                            this.mailService.sendForgotPassword(email, forgotPassword.token);
                        }
                        catch (e) {
                            console.log(e);
                            throw new common_1.HttpException('Can not send verification email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (token, resetPasswordAuthDto) {
        return __awaiter(this, void 0, void 0, function () {
            var forgotPassword, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.forgotPasswordModel.findOne({
                            token: token
                        })];
                    case 1:
                        forgotPassword = _b.sent();
                        if (!(forgotPassword &&
                            resetPasswordAuthDto.password ==
                                resetPasswordAuthDto.confirmPassword)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.findOneByEmail(forgotPassword.email)];
                    case 2:
                        user = _b.sent();
                        _a = user;
                        return [4 /*yield*/, argon2_1.hash(resetPasswordAuthDto.password)];
                    case 3:
                        _a.password = _b.sent();
                        user.save();
                        forgotPassword.deleteOne();
                        return [2 /*return*/, { message: 'password changed' }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verify = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var emailVerify, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerifyModel.findOne({ token: token })];
                    case 1:
                        emailVerify = _a.sent();
                        if (!emailVerify) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userService.findOneByEmail(emailVerify.email)];
                    case 2:
                        user = _a.sent();
                        user.isEmailVerified = true;
                        user.save();
                        emailVerify.deleteOne();
                        return [2 /*return*/, { message: 'email succssful verified' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(email_verify_schema_1.EmailVerify.name)),
        __param(1, mongoose_1.InjectModel(forgot_password_schema_1.ForgotPassword.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
