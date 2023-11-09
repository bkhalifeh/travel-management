"use strict";
exports.__esModule = true;
exports.Roles = exports.ROLE_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.ROLE_KEY = 'role';
exports.Roles = function (role) { return common_1.SetMetadata(exports.ROLE_KEY, role); };
