import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class Notice {
    @Prop({ type: SchemaTypes.Boolean, default: false })
    isReaded: boolean;

    @Prop({ type: SchemaTypes.String })
    title: string;

    @Prop({ type: SchemaTypes.String })
    content: string;

    @Prop({ type: SchemaTypes.ObjectId })
    author: UserDocument;

    @Prop({ type: SchemaTypes.ObjectId })
    reciver: UserDocument;

    // @Prop({
    //     type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    //     default: [],
    // })
    // readedNotice: UserDocument[];
}

export type NoticeDocument = Notice & Document;

export const NoticeSchema = SchemaFactory.createForClass(Notice);
