import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { TravelDocument } from 'src/travel/schemas/travel.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class Comment {
    @Prop({ type: SchemaTypes.String })
    content: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    author: UserDocument;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Travel' })
    travel: TravelDocument;

    @Prop({ type: SchemaTypes.Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: SchemaTypes.Boolean, default: false })
    inTrash: boolean;
}

export type CommentDocument = HydratedDocument<Comment>;

export const CommentSchema = SchemaFactory.createForClass(Comment);
