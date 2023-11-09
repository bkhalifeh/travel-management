import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ChangePasswordDto } from './dto/change.password.dto';
import { verify } from 'argon2';
import { ChangeAccountDto } from './dto/change.account.dto';
import { unlinkSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

@Injectable()
export class SettingService {
    constructor(private readonly userService: UserService) {}

    async changeUserAccount(req: any, changeAccountDto: ChangeAccountDto) {
        const user = await this.userService.findOneById(req.user.id);
        if (changeAccountDto.email) {
            user.email = changeAccountDto.email;
            req.user.email = user.email;
        }

        if (changeAccountDto.phoneNumber) {
            user.phoneNumber = changeAccountDto.phoneNumber;
            req.user.username = user.phoneNumber;
        }

        if (changeAccountDto.profile) {
            if (user.profile.startsWith('/static/upload')) {
                unlinkSync(
                    join(
                        __dirname,
                        '..',
                        '..',
                        'static',
                        'upload',
                        basename(user.profile),
                    ),
                );
            }
            const newProfile = changeAccountDto.profile;
            writeFileSync(
                join(
                    __dirname,
                    '..',
                    '..',
                    'static',
                    'upload',
                    newProfile.originalName,
                ),
                newProfile.buffer,
            );
            user.profile = `/static/upload/${newProfile.originalName}`;
            req.user.profile = user.profile;
        }
        user.save();
    }

    async changeUserPassword(id: string, changePasswordDto: ChangePasswordDto) {
        const user = await this.userService.findOneById(id);
        if (
            (await verify(user.password, changePasswordDto.currentPassword)) &&
            changePasswordDto.newPassword === changePasswordDto.confirmPassword
        ) {
            user.password = changePasswordDto.newPassword;
            user.save();
        }
    }
}
