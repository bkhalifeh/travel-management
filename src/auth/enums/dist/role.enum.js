"use strict";
exports.__esModule = true;
exports.NoitceManagement = exports.CommentManagement = exports.CreateTravelRoles = exports.StudentRoles = exports.CreateUserRoles = exports.UserManagementRoles = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SystemManager"] = "\u0645\u062F\u06CC\u0631 \u0633\u0627\u0645\u0627\u0646\u0647";
    Role["CollegeManager"] = "\u0645\u062F\u06CC\u0631 \u062F\u0627\u0646\u0634\u06A9\u062F\u0647";
    Role["ComputerGroupManager"] = "\u0645\u062F\u06CC\u0631 \u06AF\u0631\u0648\u0647 \u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631";
    Role["ComputerForumAdmin"] = "\u0645\u062F\u06CC\u0631 \u0627\u0646\u062C\u0645\u0646 \u0639\u0644\u0645\u06CC \u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631";
    Role["ComputerForumMember"] = "\u0639\u0636\u0648 \u0627\u0646\u062C\u0645\u0646 \u0639\u0644\u0645\u06CC \u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631";
    Role["IndustryGroupManager"] = "\u0645\u062F\u06CC\u0631 \u06AF\u0631\u0648\u0647 \u0635\u0646\u0627\u06CC\u0639";
    Role["IndustryForumAdmin"] = "\u0645\u062F\u06CC\u0631 \u0627\u0646\u062C\u0645\u0646 \u0639\u0644\u0645\u06CC \u0635\u0646\u0627\u06CC\u0639";
    Role["IndustryForumMember"] = "\u0639\u0636\u0648 \u0627\u0646\u062C\u0645\u0646 \u0639\u0644\u0645\u06CC \u0635\u0646\u0627\u06CC\u0639";
    Role["Employee"] = "\u06A9\u0627\u0631\u0645\u0646\u062F";
    Role["Master"] = "\u0627\u0633\u062A\u0627\u062F";
    Role["Student"] = "\u062F\u0627\u0646\u0634\u062C\u0648";
    Role["Contractor"] = "\u067E\u06CC\u0645\u0627\u0646\u06A9\u0627\u0631";
})(Role = exports.Role || (exports.Role = {}));
exports.UserManagementRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    // Role.ComputerForumAdmin,
    Role.IndustryGroupManager,
];
exports.CreateUserRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
];
exports.StudentRoles = [
    Role.Student,
    Role.ComputerForumAdmin,
    Role.ComputerForumMember,
    Role.IndustryForumAdmin,
    Role.IndustryForumMember,
];
exports.CreateTravelRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
    Role.ComputerForumAdmin,
    Role.IndustryForumAdmin,
];
exports.CommentManagement = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.ComputerForumAdmin,
    Role.ComputerForumMember,
    Role.IndustryGroupManager,
    Role.IndustryForumAdmin,
    Role.IndustryForumMember,
];
exports.NoitceManagement = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
];
