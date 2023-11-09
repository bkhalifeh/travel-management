"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoticeModule = void 0;
var common_1 = require("@nestjs/common");
var notice_service_1 = require("./notice.service");
var notice_controller_1 = require("./notice.controller");
var mongoose_1 = require("@nestjs/mongoose");
var notice_schema_1 = require("./schemas/notice.schema");
var user_module_1 = require("src/user/user.module");
var NoticeModule = /** @class */ (function () {
    function NoticeModule() {
    }
    NoticeModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: notice_schema_1.Notice.name, schema: notice_schema_1.NoticeSchema },
                ]),
                user_module_1.UserModule
            ],
            controllers: [notice_controller_1.NoticeController],
            providers: [notice_service_1.NoticeService]
        })
    ], NoticeModule);
    return NoticeModule;
}());
exports.NoticeModule = NoticeModule;
