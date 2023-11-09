"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ManualUpdateUserDto = exports.UpdateUserDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var create_user_dto_1 = require("./create-user.dto");
var UpdateUserDto = /** @class */ (function (_super) {
    __extends(UpdateUserDto, _super);
    function UpdateUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateUserDto;
}(mapped_types_1.PartialType(create_user_dto_1.CreateUserDto)));
exports.UpdateUserDto = UpdateUserDto;
var ManualUpdateUserDto = /** @class */ (function (_super) {
    __extends(ManualUpdateUserDto, _super);
    function ManualUpdateUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ManualUpdateUserDto;
}(mapped_types_1.PartialType(create_user_dto_1.ManualCreateUserDto)));
exports.ManualUpdateUserDto = ManualUpdateUserDto;
