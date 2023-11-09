"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TravelSchema = exports.Travel = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Travel = /** @class */ (function () {
    function Travel() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String }) // عنوان اردو
    ], Travel.prototype, "title");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String }) // خلاصه کوتاه
    ], Travel.prototype, "caption");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String }) // عکس اردو در کارت
    ], Travel.prototype, "image");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Number }) // مبلغ ثبت نام
    ], Travel.prototype, "price");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Number }) // ظرفیت باقی مانده
    ], Travel.prototype, "capacity");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String }) // مکان اردو
    ], Travel.prototype, "location");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Travel.prototype, "residence");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Travel.prototype, "transportation");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Travel.prototype, "meals");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Travel.prototype, "insurance");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Travel.prototype, "duration");
    __decorate([
        mongoose_1.Prop({ type: [{ type: mongoose_2.SchemaTypes.String }], "default": [] })
    ], Travel.prototype, "services");
    __decorate([
        mongoose_1.Prop({ type: [{ type: mongoose_2.SchemaTypes.String }], "default": [] })
    ], Travel.prototype, "itemsNeeded");
    __decorate([
        mongoose_1.Prop({ type: [{ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }], "default": [] })
    ], Travel.prototype, "users");
    __decorate([
        mongoose_1.Prop({
            type: [{ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Comment' }],
            "default": []
        })
    ], Travel.prototype, "comments");
    __decorate([
        mongoose_1.Prop({
            type: mongoose_2.SchemaTypes.ObjectId,
            ref: 'User'
        })
    ], Travel.prototype, "manager");
    Travel = __decorate([
        mongoose_1.Schema()
    ], Travel);
    return Travel;
}());
exports.Travel = Travel;
exports.TravelSchema = mongoose_1.SchemaFactory.createForClass(Travel);
