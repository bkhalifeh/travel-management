"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoticeSchema = exports.Notice = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Notice = /** @class */ (function () {
    function Notice() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Boolean, "default": false })
    ], Notice.prototype, "isReaded");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Notice.prototype, "title");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Notice.prototype, "content");
    Notice = __decorate([
        mongoose_1.Schema()
    ], Notice);
    return Notice;
}());
exports.Notice = Notice;
exports.NoticeSchema = mongoose_1.SchemaFactory.createForClass(Notice);
