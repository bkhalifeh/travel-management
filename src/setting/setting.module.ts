import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [SettingController],
    providers: [SettingService],
})
export class SettingModule {}
