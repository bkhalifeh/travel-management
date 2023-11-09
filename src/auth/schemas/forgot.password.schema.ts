import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class ForgotPassword {
    @Prop({ type: SchemaTypes.String })
    email: string;

    @Prop({ type: SchemaTypes.String })
    token: string;

    @Prop({ type: SchemaTypes.Date })
    timestamp: Date;
}
export type ForgotPasswordDocument = ForgotPassword & Document;

export const ForgotPasswordSchema =
    SchemaFactory.createForClass(ForgotPassword);
