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
exports.__esModule = true;
exports.CommentService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var comment_schema_1 = require("./schemas/comment.schema");
var role_enum_1 = require("src/auth/enums/role.enum");
var CommentService = /** @class */ (function () {
    function CommentService(commentModel) {
        this.commentModel = commentModel;
    }
    CommentService.prototype.findManyByTravelId = function (travelId) {
        return this.commentModel
            .find({
            travel: travelId,
            isVerified: true
        })
            .sort({ createdAt: -1 });
    };
    CommentService.prototype.findAll = function () {
        return this.commentModel.find();
    };
    CommentService.prototype.findNotVerified = function () {
        return this.commentModel.find({
            isVerified: false
        });
    };
    CommentService.prototype.create = function (user, createCommentDto) {
        var newComment = new this.commentModel({
            content: createCommentDto.content,
            travel: createCommentDto.travelId,
            author: user.id,
            isVerified: role_enum_1.CommentManagement.includes(user.role)
        });
        return newComment.save();
    };
    CommentService.prototype.findOne = function (id) {
        return this.commentModel.findById(id);
    };
    CommentService.prototype["delete"] = function (id) {
        return this.commentModel.deleteOne({ _id: id }).exec();
    };
    CommentService.prototype.verified = function (id) {
        return this.commentModel
            .updateOne({ _id: id }, { $set: { isVerified: true } })
            .exec();
    };
    CommentService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(comment_schema_1.Comment.name))
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
