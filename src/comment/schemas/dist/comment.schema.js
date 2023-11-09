"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentSchema = exports.Comment = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String })
    ], Comment.prototype, "content");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' })
    ], Comment.prototype, "author");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Travel' })
    ], Comment.prototype, "travel");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Boolean, "default": false })
    ], Comment.prototype, "isVerified");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Boolean, "default": false })
    ], Comment.prototype, "inTrash");
    Comment = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
