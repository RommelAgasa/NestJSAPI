import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/role.enum";

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User extends Document {

    @Prop()
    name: string;

    @Prop({ unique: true, message: 'Duplicate email entered' })
    email: string;

    @Prop()
    password: string;

    @Prop({ 
        type: [{ type: String, enum: Role }],
        default: [Role.User]
    })
    role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);