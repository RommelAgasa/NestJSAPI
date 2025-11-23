import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User{

    @Prop()
    name: string;

    @Prop({ unique: true, message: 'Duplicate email entered' })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);