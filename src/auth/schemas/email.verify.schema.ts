import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class EmailVerify {
    @Prop({ type: SchemaTypes.String })
    email: string;

    @Prop({ type: SchemaTypes.String })
    token: string;

    @Prop({ type: SchemaTypes.Date })
    timestamp: Date;
}

export type EmailVerifyDocument = EmailVerify & Document;

export const EmailVerifySchema = SchemaFactory.createForClass(EmailVerify);
