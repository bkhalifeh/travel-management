import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CommentDocument } from 'src/comment/schemas/comment.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

@Schema()
export class Travel {
    @Prop({ type: SchemaTypes.String }) // عنوان اردو
    title: string;

    @Prop({ type: SchemaTypes.String }) // خلاصه کوتاه
    caption: string;

    @Prop({ type: SchemaTypes.String }) // عکس اردو در کارت
    image: string;

    @Prop({ type: SchemaTypes.Number }) // مبلغ ثبت نام
    price: number;

    @Prop({ type: SchemaTypes.Number }) // ظرفیت باقی مانده
    capacity: number;

    @Prop({ type: SchemaTypes.String }) // مکان اردو
    location: string;

    @Prop({ type: SchemaTypes.String })
    residence: string; // محل اقامت

    @Prop({ type: SchemaTypes.String })
    transportation: string; // وسیله حمل و نقل

    @Prop({ type: SchemaTypes.String })
    meals: string; // وعده های غذایی

    @Prop({ type: SchemaTypes.String })
    insurance: string; // بیمه

    @Prop({ type: SchemaTypes.String })
    duration: string; // مدت زمان برنامه

    @Prop({ type: [{ type: SchemaTypes.String }], default: [] })
    services: string[]; // خدمات سفر

    @Prop({ type: [{ type: SchemaTypes.String }], default: [] })
    itemsNeeded: string[];

    // @Prop({ type: [{ type: SchemaTypes.String }], default: [] }) // عکس های اردو
    // images: string[];;

    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], default: [] })
    users: UserDocument[]; // کسانی که در این اردو ثبت نام کرده اند

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
        default: [],
    })
    comments: CommentDocument[];

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: 'User',
    })
    manager: UserDocument;
}

export type TravelDocument = Travel & Document;

export const TravelSchema = SchemaFactory.createForClass(Travel);
