export enum Role {
    SystemManager = 'مدیر سامانه',

    CollegeManager = 'مدیر دانشکده',

    ComputerGroupManager = 'مدیر گروه کامپیوتر',
    ComputerForumAdmin = 'مدیر انجمن علمی کامپیوتر',
    ComputerForumMember = 'عضو انجمن علمی کامپیوتر',

    IndustryGroupManager = 'مدیر گروه صنایع',
    IndustryForumAdmin = 'مدیر انجمن علمی صنایع',
    IndustryForumMember = 'عضو انجمن علمی صنایع',

    Employee = 'کارمند',
    Master = 'استاد',
    Student = 'دانشجو',
    Contractor = 'پیمانکار',
}

export const UserManagementRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    // Role.ComputerForumAdmin,
    Role.IndustryGroupManager,
    // Role.IndustryForumAdmin,
];

export const CreateUserRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
];

export const StudentRoles = [
    Role.Student,
    Role.ComputerForumAdmin,
    Role.ComputerForumMember,
    Role.IndustryForumAdmin,
    Role.IndustryForumMember,
];

export const CreateTravelRoles = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
    Role.ComputerForumAdmin,
    Role.IndustryForumAdmin,
];

export const CommentManagement = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.ComputerForumAdmin,
    Role.ComputerForumMember,
    Role.IndustryGroupManager,
    Role.IndustryForumAdmin,
    Role.IndustryForumMember,
];

export const NoitceManagement = [
    Role.SystemManager,
    Role.CollegeManager,
    Role.ComputerGroupManager,
    Role.IndustryGroupManager,
];
