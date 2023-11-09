import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UtilService } from 'src/util/util.service';
import { Role } from 'src/auth/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { hash } from 'argon2';
import { ManualUpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) public readonly userModel: Model<User>,
    ) {}

    deleteOne(id: string) {
        return this.userModel.findByIdAndRemove(id).exec();
    }

    findOneByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }
    findOneById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }
    findAll() {
        return this.userModel.find();
    }

    findAllByRole(r: Role) {
        let users: UserDocument[];
        if (r === Role.SystemManager) {
            return this.userModel.find();
        } else if (r === Role.CollegeManager) {
            return this.userModel.find({
                role: { $ne: Role.SystemManager },
            });
        } else if (
            r === Role.ComputerGroupManager ||
            r === Role.ComputerForumAdmin
        ) {
            return this.userModel.find({
                field: { $eq: 'کامپیوتر' },
            });
        } else if (
            r === Role.IndustryGroupManager ||
            r === Role.IndustryForumAdmin
        ) {
            return this.userModel.find({
                field: { $eq: 'صنایع' },
            });
        } else {
            return [];
        }
    }

    create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel({
            ...createUserDto,
            profile: UtilService.randomProfile(createUserDto.gendere),
        });
        return newUser.save();
    }

    async updateOne(id: string, manualUpdateUserDto: ManualUpdateUserDto) {
        if (
            manualUpdateUserDto.firstName &&
            manualUpdateUserDto.firstName.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        firstName: manualUpdateUserDto.firstName,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.lastName &&
            manualUpdateUserDto.lastName.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        lastName: manualUpdateUserDto.lastName,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.phoneNumber &&
            manualUpdateUserDto.phoneNumber.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        phoneNumber: manualUpdateUserDto.phoneNumber,
                    },
                })
                .exec();
        }

        if (manualUpdateUserDto.email && manualUpdateUserDto.email.length > 1) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        email: manualUpdateUserDto.email,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.gendere &&
            manualUpdateUserDto.gendere.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        gendere: manualUpdateUserDto.gendere,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.password &&
            manualUpdateUserDto.password.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        password: await hash(manualUpdateUserDto.password),
                    },
                })
                .exec();
        }

        if (manualUpdateUserDto.role) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        role: manualUpdateUserDto.role,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.studentId &&
            manualUpdateUserDto.studentId.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        studentId: manualUpdateUserDto.studentId,
                    },
                })
                .exec();
        }

        if (
            manualUpdateUserDto.entryYear &&
            manualUpdateUserDto.entryYear.length > 1
        ) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        entryYear: manualUpdateUserDto.entryYear,
                    },
                })
                .exec();
        }

        if (manualUpdateUserDto.field && manualUpdateUserDto.field.length > 1) {
            await this.userModel
                .findByIdAndUpdate(id, {
                    $set: {
                        field: manualUpdateUserDto.field,
                    },
                })
                .exec();
        }
    }

    async work() {
        // const systemAdmin = await this.findOneByEmail('admin@gmail.com');
        // systemAdmin.isEmailVerified = true;
        // await systemAdmin.updateOne().exec();
        // new this.userModel({
        //     firstName: 'غلامرضا',
        //     lastName: 'احمدی',
        //     phoneNumber: '09127218309',
        //     email: 'ghahmadi@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.CollegeManager,
        //     isEmailVerified: true
        // }).save();
        // new this.userModel({
        //     firstName: 'حمیدرضا',
        //     lastName: 'کبودجای',
        //     phoneNumber: '09175542582',
        //     email: 'hakboodjay@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.ComputerGroupManager,
        //     isEmailVerified: true
        // }).save();
        // new this.userModel({
        //     firstName: 'امیرحسین',
        //     lastName: 'رضاییان',
        //     phoneNumber: '09171234567',
        //     email: 'amir.rezaiyan@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.ComputerForumAdmin,
        //     isEmailVerified: true,
        //     field: 'کامپیوتر',
        //     entryYear: '1398',
        //     studentId: '980261444'
        // }).save();
        // new this.userModel({
        //     firstName: 'امین',
        //     lastName: 'بی آزار',
        //     phoneNumber: '09175580149',
        //     email: 'amin.biazar@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.ComputerForumMember,
        //     isEmailVerified: true,
        //     field: 'کامپیوتر',
        //     entryYear: '1398',
        //     studentId: '980261443'
        // }).save();
        // new this.userModel({
        //     firstName: 'باقر',
        //     lastName: 'قلعه نویی',
        //     phoneNumber: '09165580149',
        //     email: 'b.ghalee@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.IndustryGroupManager,
        //     isEmailVerified: true
        // }).save();
        // new this.userModel({
        //     firstName: 'مرتضی',
        //     lastName: 'رستمی',
        //     phoneNumber: '09164480149',
        //     email: 'm.rostami@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.IndustryForumAdmin,
        //     isEmailVerified: true,
        //     entryYear: '1398',
        //     field: 'صنایع',
        //     studentId: '980261314'
        // }).save();
        // new this.userModel({
        //     firstName: 'آیناز',
        //     lastName: 'عباسی',
        //     phoneNumber: '09363341617',
        //     email: 'a.abbasi@gmail.com',
        //     gendere: 'female',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('female'),
        //     role: Role.IndustryForumMember,
        //     isEmailVerified: true,
        //     entryYear: '1398',
        //     field: 'صنایع',
        //     studentId: '980261551'
        // }).save();
        // new this.userModel({
        //     firstName: 'عقیل',
        //     lastName: 'تشانی',
        //     phoneNumber: '09170141920',
        //     email: 'aghil.tashani@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.Employee,
        //     isEmailVerified: true
        // }).save();
        // new this.userModel({
        //     firstName: 'سید محمد',
        //     lastName: 'بیدکی',
        //     phoneNumber: '09176782020',
        //     email: 's.m.bidoki@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.Master,
        //     isEmailVerified: true
        // }).save();
        // new this.userModel({
        //     firstName: 'امیرحسین',
        //     lastName: 'حاتمی',
        //     phoneNumber: '09161382020',
        //     email: 'amir.hatami@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.Student,
        //     isEmailVerified: true,
        //     field: 'کامپیوتر',
        //     entryYear: '1399',
        //     studentId: '990261456'
        // }).save();
        // new this.userModel({
        //     firstName: 'عباس',
        //     lastName: 'مشایخ',
        //     phoneNumber: '09161382020',
        //     email: 'abbas.mashayekh@gmail.com',
        //     gendere: 'male',
        //     password: await hash('1234'),
        //     profile: UtilService.randomProfile('male'),
        //     role: Role.Contractor,
        //     isEmailVerified: true
        // }).save();
    }
}
