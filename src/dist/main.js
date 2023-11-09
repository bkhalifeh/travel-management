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
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app/app.module");
var path_1 = require("path");
var config_1 = require("@nestjs/config");
var express_session_1 = require("express-session");
var connect_mongo_1 = require("connect-mongo");
var cookie_parser_1 = require("cookie-parser");
var compression_1 = require("compression");
var app_service_1 = require("./app/app.service");
var morgan_1 = require("morgan");
var passport_1 = require("passport");
var common_1 = require("@nestjs/common");
var user_service_1 = require("./user/user.service");
var app_config_service_1 = require("./app-config/app-config.service");
var role_enum_1 = require("./auth/enums/role.enum");
var argon2_1 = require("argon2");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, appService, configService, userService, adminInfo, _a, userAdmin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _b.sent();
                    appService = app.get(app_service_1.AppService);
                    configService = app.get(config_1.ConfigService);
                    userService = app.get(user_service_1.UserService);
                    _a = {
                        firstName: app_config_service_1.AppConfigService.ADMIN_FIRST_NAME,
                        lastName: app_config_service_1.AppConfigService.ADMIN_LAST_NAME,
                        phoneNumber: app_config_service_1.AppConfigService.ADMIN_PHONE_NUMBER,
                        email: app_config_service_1.AppConfigService.ADMIN_EMAIL,
                        gendere: app_config_service_1.AppConfigService.ADMIN_GENDERE
                    };
                    return [4 /*yield*/, argon2_1.hash(app_config_service_1.AppConfigService.ADMIN_PASSWORD)];
                case 2:
                    adminInfo = (_a.password = _b.sent(),
                        _a.profile = app_config_service_1.AppConfigService.ADMIN_PROFILE,
                        _a);
                    return [4 /*yield*/, userService.findOneByEmail(adminInfo.email)];
                case 3:
                    userAdmin = _b.sent();
                    if (!userAdmin) return [3 /*break*/, 5];
                    return [4 /*yield*/, userAdmin
                            .updateOne({ $set: __assign(__assign({}, adminInfo), { role: role_enum_1.Role.SystemManager }) })
                            .exec()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, new userService.userModel(__assign(__assign({}, adminInfo), { role: role_enum_1.Role.SystemManager })).save()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    app.use(morgan_1["default"]('dev'));
                    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
                    app.disable('x-powered-by');
                    app.enableCors();
                    app.setViewEngine('pug');
                    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
                    app.use(compression_1["default"]());
                    app.use(cookie_parser_1["default"](configService.get('SECRET_COOKIE')));
                    app.use(express_session_1["default"]({
                        secret: configService.get('SECRET_SESSION'),
                        resave: false,
                        saveUninitialized: false,
                        store: connect_mongo_1["default"].create({
                            client: appService.connection.getClient(),
                            dbName: configService.get('DB_NAME')
                        }),
                        cookie: {
                            maxAge: 1000 * 60 * 60 * 24
                        }
                    }));
                    app.use(passport_1["default"].initialize());
                    app.use(passport_1["default"].session());
                    return [4 /*yield*/, app.listen(configService.get('APP_PORT'), configService.get('APP_HOST'))];
                case 8:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
