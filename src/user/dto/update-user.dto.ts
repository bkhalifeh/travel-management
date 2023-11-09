import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, ManualCreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ManualUpdateUserDto extends PartialType(ManualCreateUserDto) {}
