import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AppConfigService } from 'src/app-config/app-config.service';
import { Role } from 'src/auth/enums/role.enum';
import { NoticeDocument } from 'src/notice/schemas/notice.schema';
import { TravelDocument } from 'src/travel/schemas/travel.schema';

@Schema()
export class User {
    @Prop({ type: SchemaTypes.String, required: true })
    firstName: string;

    @Prop({ type: SchemaTypes.String, required: true })
    lastName: string;

    @Prop({ type: SchemaTypes.String, required: true })
    phoneNumber: string;

    @Prop({ type: SchemaTypes.String, unique: true, required: true })
    email: string;

    @Prop({
        type: SchemaTypes.String,
        enum: ['male', 'female'],
        required: true,
    })
    gendere: string;

    @Prop({ type: SchemaTypes.String, required: true })
    password: string;

    @Prop({ type: SchemaTypes.String, required: true })
    profile: string;

    @Prop({ type: SchemaTypes.String, required: false })
    studentId: string;

    @Prop({
        type: SchemaTypes.String,
        enum: AppConfigService.ENTRY_YEARS,
        required: false,
    })
    entryYear: string;

    @Prop({
        type: SchemaTypes.String,
        enum: AppConfigService.FIELDS,
        required: false,
    })
    field: string;

    @Prop({ type: SchemaTypes.String, enum: Role, required: true })
    role: Role;

    @Prop({ type: SchemaTypes.Boolean, default: false })
    isEmailVerified: boolean;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Travel' }],
        default: [],
    })
    travels: TravelDocument[];

    // @Prop({
    //     type: [{ type: SchemaTypes.ObjectId, ref: 'Notice' }],
    //     default: [],
    // })
    // notices: NoticeDocument[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
