"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var app_config_service_1 = require("src/app-config/app-config.service");
var role_enum_1 = require("src/auth/enums/role.enum");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: true })
    ], User.prototype, "firstName");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: true })
    ], User.prototype, "lastName");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: true })
    ], User.prototype, "phoneNumber");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, unique: true, required: true })
    ], User.prototype, "email");
    __decorate([
        mongoose_1.Prop({
            type: mongoose_2.SchemaTypes.String,
            "enum": ['male', 'female'],
            required: true
        })
    ], User.prototype, "gendere");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: true })
    ], User.prototype, "password");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: true })
    ], User.prototype, "profile");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, required: false })
    ], User.prototype, "studentId");
    __decorate([
        mongoose_1.Prop({
            type: mongoose_2.SchemaTypes.String,
            "enum": app_config_service_1.AppConfigService.ENTRY_YEARS,
            required: false
        })
    ], User.prototype, "entryYear");
    __decorate([
        mongoose_1.Prop({
            type: mongoose_2.SchemaTypes.String,
            "enum": app_config_service_1.AppConfigService.FIELDS,
            required: false
        })
    ], User.prototype, "field");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.String, "enum": role_enum_1.Role, required: true })
    ], User.prototype, "role");
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.SchemaTypes.Boolean, "default": false })
    ], User.prototype, "isEmailVerified");
    __decorate([
        mongoose_1.Prop({
            type: [{ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Travel' }],
            "default": []
        })
    ], User.prototype, "travels");
    User = __decorate([
        mongoose_1.Schema()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
